## Target
- Exercise/flow: `Mengen legen` im Kinder-Spielraum / Mengen-Modul (`Mengen bis 5 legen`).
- Learner action: Steine legen, passende Menge wählen, Hilfe nutzen, Nochmal oder Pause nutzen.
- Teacher observation: Welche Hilfeform das Kind braucht, ob die Menge sicher gelegt wurde, und welcher nächste kleine Schritt passt.
- Browser/build checked: Ja. `npm run build` scheiterte wegen Rolldown-Native-Bindings; der Fallback `npm run build:esbuild` erzeugte `dist/`. Der lokale Server lief dann unter `http://127.0.0.1:8766/` und wurde im Browser geprüft.

## Basal Learner
- Works: Der Start ist ruhig und groß; die Hauptanweisung lautet kurz „Lege zwei Steine in das Feld.“. Die Mattenfläche ist klar sichtbar, und die Aktion „Stein legen“ ist direkt erreichbar.
- Breaks: Die Zielauswahl bleibt unter einer Textzeile „Welche Menge passt?“; für basal Lernende ist das noch etwas abstrakt, wenn sie nur mit Blick oder Geste arbeiten.
- Needed Help: Vormachen, gemeinsam einen Stein legen, dann gemeinsam die passende Zahl zeigen; bei Bedarf die Auswahl weiter reduzieren.

## Supported Learner
- Works: A/B/C-Niveaus sind sichtbar; im getesteten Ablauf wurde beim Wechsel auf B die Auswahl auf 2/3/4 erweitert und die Lehrkraftnotiz aktualisiert. Hilfen wie „Weniger Auswahl“, „Pause“ und „Nochmal“ sind vorhanden.
- Breaks: Die Hilfe ist funktional vorhanden, aber noch nicht als klarer Kind-Hilfeblock mit getrennten Optionen sichtbar. Die Lehrkraft-Hinweise bleiben textnah.
- Needed Help: Auswahl verkleinern, modellieren, dann selbst noch einmal legen lassen; Hilfe nicht nur als Text, sondern als sofort lesbare Aktion vermitteln.

## Symbolic / Extended Learner
- Works: Die Menge wird nicht nur gezählt, sondern über Auswahl und Abgleich verarbeitet. Der nächste kleine Schritt ist pädagogisch benannt und alltagsnah.
- Breaks: Für stärkere Kinder wirkt der Ablauf eher wie Wiederholung als wie eine kleine echte Herausforderung; eine optionale Vergleichsaufgabe fehlt noch sichtbar.
- Needed Help: Eine kleine Anschlussaufgabe wie „mehr/weniger“ oder Vergleich mit zwei Mengen, ohne den Spielraum in ein Arbeitsblatt zu verwandeln.

## Teacher In Real Class
- Startability: Hoch; der Weg ins Spiel ist kurz und direkt. Keine Anmeldung, keine personenbezogenen Daten, lokale Speicherung.
- Observable evidence: Beobachtbar sind Steine legen, Zahl wählen, Hilfe nutzen und Niveau wechseln. Der Lehrkraftbereich nennt den nächsten Schritt klar.
- Missing observation: Der Lehrkraft-Hinweis ist als Details-Block vorhanden, aber im offenen Zustand ist noch nicht geprüft, ob er im schmalen Layout keine Kind-Aktion verdeckt. Ein echter schmaler Viewport-Test war in diesem Lauf nicht möglich.

## Works
- Browser wurde geprüft: Ja, im lokalen Browserlauf auf `http://127.0.0.1:8766/`.
- Build wurde geprüft: Ja, aber nur mit Fallback (`npm run build:esbuild`), weil `npm run build` am Rolldown-Binding scheiterte.
- Die Kindfläche wirkt grundsätzlich ruhig und nicht wie ein Dashboard.
- Das Spiel hat klare, große Buttons und eine kurze Handlung.
- Der Lehrkraftbereich trennt Beobachtung und Kinderspiel grundsätzlich sauber.

## Breaks
- Der reguläre Vite/Rolldown-Build ist im aktuellen Setup nicht verlässlich.
- Die Hilfe wirkt zwar vorhanden, aber noch nicht als explizit kindgerechter Hilfeblock.
- Der offene Lehrkraftbereich wurde nur funktional geprüft; ein schmaler Viewport bzw. echter Tablet-/Mobilzustand wurde nicht geprüft.

## Needed Help
- Vormachen und gemeinsam legen.
- Auswahl reduzieren.
- Noch einmal neu starten.
- Erst danach die passende Zahl wählen.

## Verdict
- Status: small fix
- Biggest blocker: Nicht die Lernhandlung selbst, sondern die noch nicht geprüfte schmale Ansicht und die eher textlastige Hilfe-/Lehrkraftdarstellung.
- Smallest useful fix: Einen gezielten Schmalansicht-Test für `Mengen legen` nachholen und dabei nur prüfen, ob die Hilfebereiche und der Lehrkraftdrawer die Kinderaktion stören.

## Next Micro-Prompt
Prüfe ausschließlich `Mengen legen` auf schmalem Viewport: Sind die großen Touchziele weiterhin klar, bleiben Mattenfläche und Zahlwahl ohne Überlappung sichtbar, und verdeckt der offene Lehrkraftbereich keine Kindaktion? Kein neuer Inhalt, nur Sichtbarkeit, Abstände und Flow beurteilen.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Schmalansicht-Test fuer `Mengen legen` gezielt nachholen.
- CHRIS_ENTSCHEIDET: Ob der Rolldown-/Vite-Buildfehler lokal per Neuinstallation behoben oder dauerhaft mit Fallback-Build gearbeitet werden soll.
- BEOBACHTEN: Ob die Hilfe im echten Unterricht eher als direkte Hilfekarten als als Textblock gebraucht wird.
- SPAETER: Eine kleine Anschlussaufgabe fuer mehr/weniger oder Vergleich, falls der Mengenraum stabil bleibt.
- BLOCKIERT: nicht geprueft: echter Tablet-/Mobiltest in diesem Lauf.
- NICHT_TUN: Kein neuer Spielraum und kein Umbau der gesamten Navigation, bevor `Mengen legen` als Referenz ruhig genug ist.
- Naechste kleinste Aktion: Schmalen Viewport in einer eigenen kurzen Prüfrunde testen.
- Beleg / Datei: /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/testpilot-2026-06-04.md
