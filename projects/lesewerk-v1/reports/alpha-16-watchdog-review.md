# Alpha 16 Slice D – Final Watchdog Review und Alpha 17 Empfehlung

Datum: 2026-05-17
Status: Accepted / nicht blockiert

## Kurzfazit

Alpha 16 ist als kleine, teacher-facing Praxis-Pilotkarte akzeptiert. Die Karte liegt im Lehrerbereich direkt nach dem 2-Karten-Pilotmodus, enthält genau drei Leitfragen, bleibt lokal/anonym/nicht-diagnostisch und erzeugt keine neue Speicher-, Export-, Login-, Cloud- oder Bewertungslogik.

Die Slice-C-Prüfung (`reports/alpha-16-ge-touch-practice-review.md`) bewertet die Karte als `Accept with minor notes`. Der finale Watchdog bestätigt diese Einschätzung nach Tests, Build, Source-Scan und Browserprüfung.

## Geprüfte Grundlage

Gelesen und berücksichtigt:

- `reports/alpha-16-goal-prompt.md`
- `reports/alpha-16-practice-card-blueprint.md`
- `reports/alpha-16-practice-card-implementation-report.md`
- `reports/alpha-16-ge-touch-practice-review.md`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`

## Geänderte Dateien in Alpha 16

Durch Slice B/C/D relevant:

- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-16-practice-card-blueprint.md`
- `reports/alpha-16-practice-card-implementation-report.md`
- `reports/alpha-16-ge-touch-practice-review.md`
- `reports/alpha-16-watchdog-review.md`

Hinweis: Das Projekt liegt innerhalb eines größeren Git-Roots (`/Users/zondrius/hermes-workspace`). `lesewerk-v1` wird dort als untracked Projektordner geführt; deshalb ist für diesen Slice kein sauberer Git-Diff innerhalb eines eigenen Repos verfügbar. Die oben genannten Dateien sind aus den Slice-Berichten und der Source-Prüfung abgeleitet.

## Was Alpha 16 geändert hat

- Lehrerbereich ergänzt um `Praxis-Pilotkarte` direkt unter `2-Karten-Pilotmodus`.
- Hinweistext ergänzt: `Nach dem 2-Karten-Pilot nur Sichtbares festhalten. Keine Namen, keine Diagnose, keine Speicherung.`
- Genau drei lokale Textfelder ergänzt:
  - `Start gelungen?`
  - `Welche Hilfe wurde genutzt?`
  - `Nächster kleinster Schritt?`
- Keine React-State-Anbindung, keine Persistenz, kein Export und kein Upload für diese Eingaben ergänzt.
- Responsive CSS ergänzt: drei Spalten auf breitem Bildschirm, zwei Spalten unter 1100 px, eine Spalte unter 640 px.
- Inhalts-/Sicherheitstest für die Alpha-16-Praxiskarte ergänzt.

## Automatische Tests

Ausgeführt:

```bash
npm test
```

Ergebnis:

- 68 Tests bestanden
- 0 fehlgeschlagen
- 0 TODO
- Dauer laut Runner: ca. 54 ms

Bewertung: Pass.

## Build

Ausgeführt:

```bash
npm run build
```

Ergebnis:

- `tsc -b` erfolgreich
- `node scripts/build.mjs` erfolgreich

Bewertung: Pass.

## Source-Level Privacy-/Content-Safety-Scan

Ausgeführt als Regex-Scan in `src` auf:

- Netzwerkzugriffe: `fetch`, `XMLHttpRequest`, `axios`, `WebSocket`, `sendBeacon`
- XSS-/Injection-Risiken: `innerHTML`, `dangerouslySetInnerHTML`, `eval`, `new Function`
- Storage: `localStorage`, `sessionStorage`, `indexedDB`, `document.cookie`
- Assessment-/Drucksprache: `Score`, `Punkte`, `Rangliste`, `Ranking`, `Note`, `Prozent`, `IQ`, `falsch`, `Fehler`, `richtig`, `bewerten`, `Bewertung`
- sensible Schüler-/Diagnosebegriffe: `Diagnose`, `diagnostisch`, `Diagnostik`, `Förderdiagnose`, `Schülername`, `Geburtsdatum`, `Adresse`, `Eltern`, `Krankheit`, `Behinderung`
- stale Alpha-Sprache: `Alpha 12`, `Alpha-12`, `alpha-12`

Ergebnis:

- Netzwerk: 0 Treffer
- XSS/Injection: 0 Treffer
- Storage: 3 Treffer, alle bestehendes `localStorage` für anonymes Demo-Profil in `src/App.tsx` (`getItem`, `setItem`, `removeItem`)
- Assessment-/Drucksprache: 2 Treffer, beide Schutzformulierungen `Keine Bewertung ...`
- sensible/diagnostische Begriffe: 3 Treffer, alle Schutzformulierungen `Keine Diagnose ...`
- stale Alpha 12: 0 Treffer

Bewertung: Pass with note.

Notiz: `localStorage` bleibt in diesem Stand akzeptabel, weil nur die anonyme Profilwahl gespeichert wird. Die Praxis-Pilotkarte selbst speichert ihre Textfeldeingaben nicht.

## Browsercheck nach Build

Lokaler statischer Server:

```text
http://127.0.0.1:53218/?alpha16-watchdog=1
```

Desktop-Check im Browser:

- App lädt mit Titel `LeseWerk V1`.
- Lehrerbereich lässt sich öffnen.
- `Praxis-Pilotkarte` ist sichtbar.
- Alle drei Prompts sind sichtbar:
  - `Start gelungen?`
  - `Welche Hilfe wurde genutzt?`
  - `Nächster kleinster Schritt?`
- Drei Textfelder sind über passende `aria-label` erreichbar.
- Dokumentbreite: `bodyScrollWidth=1280`, `bodyClientWidth=1280`; kein horizontaler Overflow im Desktop-Check.
- Browser-Konsole: 0 Console-Messages, 0 JavaScript-Errors nach Prüfung.

Narrow-Check im Browser:

- Per 390-px-Iframe gegen denselben gebauten Stand geprüft.
- Lehrerbereich und `Praxis-Pilotkarte` sichtbar.
- Alle drei Prompts sichtbar.
- `scrollWidth=390`, `clientWidth=390`; kein horizontaler Overflow.
- CSS-Quelle bestätigt unter `@media (max-width: 640px)` eine einspaltige `.practice-prompt-grid`.

Bewertung: Pass.

## GE-/Praxis-/Touch-Review

`reports/alpha-16-ge-touch-practice-review.md` entschied:

- `Accept with minor notes`

Kernaussagen:

- Die drei Leitfragen sind alltagsnah und gut beobachtbar.
- Die Sprache bleibt sachlich, kurz und nicht diagnostisch.
- Keine Hinweise auf Speicherung, Export, Cloud, Login oder Datei-Workflow.
- Ein echter physischer Tablet-/Touch-Test bleibt wünschenswert.
- Ein Hinweis auf die bewusst nicht gespeicherten Browser-Eingaben ist sinnvoll.

## Entscheidung

Accepted / nicht blockiert.

Begründung:

- Tests bestehen.
- Build besteht.
- Source-Scan findet keine neuen Netzwerk-, XSS-, stale-Version-, Cloud-, Export- oder Speicherblocker für die Praxis-Pilotkarte.
- Browsercheck bestätigt Sichtbarkeit der Praxis-Pilotkarte und der drei Leitfragen auf Desktop und schmalem Viewport.
- Die Umsetzung bleibt im Alpha-16-Ziel: kleiner, lokaler, nicht-diagnostischer Nachbereitungsimpuls für den realen 10–15-Minuten-Ersteinsatz.

## Verbleibende Risiken

- Kein echter iPad-/Touch-Test auf physischem Gerät im Klassenraum.
- Kein Test mit einem realen Kind und realer Unterrichtsdynamik.
- Keine externe Datenschutz-, Lizenz- oder Barrierefreiheitsprüfung.
- Die Textfelder sind bewusst flüchtig. Das ist datenschutzfreundlich, kann aber für Lehrkräfte erklärungsbedürftig sein.
- Das bestehende anonyme Profil-`localStorage` darf weiterhin nicht auf Beobachtungsdaten, echte Namen oder diagnostische Informationen erweitert werden.

## Präzise Alpha-17-Empfehlung

Alpha 17 sollte kein neues großes Feature starten. Der beste nächste Schritt ist:

`Alpha 17 – Speicherfrei-Hinweis und realer Touch-Pilot-Abgleich`

Ziel:

- Die Praxis-Pilotkarte im UI eindeutig als flüchtige Notizhilfe markieren und danach den realen Touch-/Klassenraumtest vorbereiten.

Konkrete Umsetzung:

1. Direkt an der Praxis-Pilotkarte einen sehr kurzen Hinweis ergänzen: `Hinweis: Diese Notizen werden nicht gespeichert. Bei Bedarf sofort anonym auf Papier übertragen.`
2. Einen kleinen Test ergänzen, der diese Nicht-Speicher-Formulierung absichert.
3. Einen einseitigen Pilot-Abgleich als Report erstellen: Was muss Chris beim echten Tablet-Test prüfen? Touch-Treffer, Lesbarkeit, Zeitbedarf, Ablenkung, Umgang mit flüchtigen Notizen.

Nicht tun in Alpha 17:

- keine Speicherung der Praxisnotizen;
- kein PDF-/Export-Workflow;
- keine Schülerverwaltung;
- keine neue Diagnostik;
- kein größeres Dashboard.

Warum genau dieser Schritt:

- Er schließt den wichtigsten Minderpunkt aus Slice C/D, ohne die datensparsame Grundlinie zu brechen.
- Er bereitet den echten Praxistest vor, statt die App vor belastbarer Unterrichtserfahrung weiter aufzublähen.
