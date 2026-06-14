# Alpha 17 Slice A – Speicherfrei-Hinweis an Praxis-Pilotkarte

Datum: 2026-05-17
Status: Implementiert, Tests und Build bestanden, Review erforderlich

## Kurzfazit

Die Praxis-Pilotkarte zeigt jetzt direkt unter den drei lokalen Notizfeldern den geforderten Speicherfrei-Hinweis. Die Änderung ergänzt nur sichtbare Copy und einen fokussierten Quelltexttest; es wurde keine neue Speicher-, Export-, Cloud-, Login- oder Upload-Logik ergänzt.

## Geänderte Dateien

- `src/App.tsx`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-17-no-storage-hint-report.md`

## Umsetzung

Ergänzt wurde der exakte sichtbare Hinweis direkt in der `Praxis-Pilotkarte`:

`Hinweis: Diese Notizen werden nicht gespeichert. Bei Bedarf sofort anonym auf Papier übertragen.`

Der Hinweis steht unter den drei bestehenden Praxisfragen:

- `Start gelungen?`
- `Welche Hilfe wurde genutzt?`
- `Nächster kleinster Schritt?`

Die Textareas bleiben uncontrolled und lokal im Browser. Es wurde kein React-State, keine Persistenz, kein Export und keine Übertragung für diese Notizen ergänzt.

## Testschutz

Ergänzt wurde ein fokussierter Test:

- `Alpha 17 practice card shows the exact no-storage hint`

Der Test prüft, dass die exakte Phrase nach der `Praxis-Pilotkarte` im App-Quelltext vorkommt.

## Verifikation

Ausgeführt:

```bash
node --test tests/lesewerk-content.test.mjs --test-name-pattern "Alpha 17 practice card shows the exact no-storage hint"
npm test
npm run build
```

Ergebnis:

- RED vor Umsetzung: der neue Alpha-17-Test schlug erwartungsgemäß fehl, weil der Hinweis noch fehlte.
- GREEN nach Umsetzung: der fokussierte Alpha-17-Test bestanden.
- `npm test`: 69 bestanden, 0 fehlgeschlagen, 0 TODO.
- `npm run build`: erfolgreich.

Browserprüfung nach Build:

- Lokaler Server: `http://127.0.0.1:53217/`
- Hinweis: Port `4173` war bereits belegt; deshalb wurde `53217` genutzt.
- Desktop: Lehrerbereich geöffnet; `Praxis-Pilotkarte` und exakter Hinweis sichtbar; keine Browser-Console-Fehler.
- Narrow-Check per 390-px-Iframe: `Praxis-Pilotkarte` sichtbar, Hinweis sichtbar, Promptgrid auf eine Spalte (`260px`), kein horizontaler Overflow (`scrollWidth: 390`, `clientWidth: 390`).

## Datenschutz- und Scope-Check

Geprüft:

- Kein neues `new Blob`, `URL.createObjectURL`, `download=`, `fetch(`, `authToken`, Login-, Upload-, Cloud-Sync-, Schülerverwaltungs- oder Datenbank-Code ergänzt.
- Im App-Quelltext existieren weiterhin nur die bereits vorhandenen lokalen Demo-Profil-`localStorage`-Zugriffe und bestehende Cloud-Negativhinweise.
- Keine echten Namen, keine Diagnose, kein Score, kein Timer, keine Rankings, keine Noten ergänzt.

## Rest-Risiken

- Kein echter Tablet-/Touch-Test auf physischem Gerät durchgeführt; nur Desktop und schmaler Browser-/Iframe-Check.
- Codeänderung braucht gemäß Kanban-Vorgabe menschliches Review, bevor die Aufgabe abgeschlossen wird.
