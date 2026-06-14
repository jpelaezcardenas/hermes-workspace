# Alpha 59 – Auswahl-Spielsequenz

## Result
- Built/changed: `src/App.tsx`
- New flow: Lehrkraft wählt 1–4 bestehende Karten im Tagesweg und startet danach `Auswahl-Spiel starten`.
- Child-facing flow: Eine große Startkarte öffnet den Fokusmodus. Danach erscheint genau eine Karte pro Runde mit `Runde X von N`, `Fertig`, anschließend `Nochmal`, `Weiter` oder `Zur Lehrkraft`.

## Flow tested
- Teacher selection path: Auswahlbereich geöffnet, Ball + Tasse als vorhandene Karten gewählt, Auswahl-Spiel gestartet.
- Child sequence path: Fokus-Startkarte geöffnet, Runde 1 beendet, `Weiter` zur nächsten Runde genutzt.
- Verified in browser console/DOM: `Runde 1 von 2`, danach `Runde 2 von 2` mit Tasse.
- Existing supports: Bildhilfe, Silbenfarben und reduzierte Auswahl werden beim Auswahl-Spiel sicher aktiviert; Sign-Hinweis bleibt nutzbar, wenn aktiv.
- Library safety: Im aktiven Fokusspiel wird keine Bibliotheks-Grid-Auswahl angezeigt; Kind sieht nur die aktuelle Karte.

## Checks run
- `npm test -- --run` → pass, 161/161 tests.
- `npm run build` → pass.
- Browser desktop smoke at `http://127.0.0.1:5174/` → pass.
- Mobile-like smoke: keine echte Browser-Viewport-Umschaltung im verfügbaren Browser-Tool; responsive Fokus-CSS bleibt unverändert und wurde über Build/DOM geprüft. Manuelle Nachprüfung bei schmaler Breite empfohlen.

## Remaining gaps
- Story-Karten werden für diese Alpha bewusst nicht als Spielrunde umgesetzt. Das Auswahl-Spiel nutzt robuste Task-Karten; ausgewählte Storys werden im Sequenzpfad übersprungen, sofern Task-Karten vorhanden sind.
- Wenn ausschließlich Storys gewählt werden, fällt die Sequenz auf einen sicheren Task-Standardpfad zurück. Das ist sicherer als eine schwache Story-Spielumsetzung.
- Der ältere Mama-Tagespfad bleibt separat und sichtbar; er ist nicht die neue flexible Auswahl-Sequenz.

## Datenschutz / GE-Check
- Keine Namen, keine Diagnosen, keine Speicherung, keine Bewertung.
- Kein Timer, kein Score, kein Ranking.
- Lehrkraft steuert die Auswahl; Kind browsed nicht durch die volle Bibliothek.

## Ampel
- Grün: Task-Karten-Sequenz für 1–4 vorbereitete Karten.
- Gelb: Story-Unterstützung als eigener Folgeslice sinnvoll.
- Rot: keine identifizierten Datenschutz- oder Build-Blocker.

## Nächster kleinster Slice
Story-Karten im Fokusspiel als vereinfachte, ruhige Mini-Story-Runde separat spezifizieren und erst dann implementieren – ohne Frage-/Antwort-Druck und ohne volle Bibliothek im Kindermodus.
