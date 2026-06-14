## Target
- Exercise/flow: Mengen legen (`Mengen legen` aus dem Kinder-Start).
- Learner action: Steine legen, Menge wählen, ruhiges Feedback lesen, bei Bedarf Hilfe/Nochmal nutzen.
- Teacher observation: Welche Hilfeform braucht das Kind, ob die Menge sicher gelegt wurde, und welcher nächste kleine Schritt passt.

## Basal Learner
- Works: Sehr klare, große Startfläche; ein sichtbares Handlungsobjekt (Menge-Matte); die Hauptaktion „Stein legen“ ist direkt erreichbar; Rückmeldung ist kurz und ruhig.
- Breaks: Die Auswahlzahlen stehen neben der Legematte noch etwas getrennt; wenn das Kind nur mit Blick oder Geste arbeitet, braucht es weiterhin Begleitung.
- Needed Help: Vormachen, gemeinsam einen Stein legen, dann gemeinsam die passende Zahl zeigen.

## Supported Learner
- Works: Hilfe-Buttons sind vorhanden; „Weniger Auswahl“, „Pause“ und „Nochmal“ reduzieren Druck; A/B/C-Niveaus erlauben Anpassung.
- Breaks: Die Lehrkraft-Hinweise sind noch etwas textlastig, wenn man sie schnell im Unterricht erfassen will.
- Needed Help: Auswahl verkleinern, Modell geben, Schritt für Schritt begleiten, dann noch einmal selbst legen lassen.

## Symbolic / Extended Learner
- Works: Die Menge kann mit Zahlwahl abgeglichen werden; ruhiges Erfolgsfeedback zeigt die richtige Zuordnung; die nächste Lernhandlung ist benannt.
- Breaks: Für stärkere Kinder ist der Pfad noch eher Wiederholung als wirkliche Herausforderung.
- Needed Challenge: Mehr/weniger oder kleine Vergleichsaufgabe im Anschluss, ohne die Übung in ein Arbeitsblatt zu verwandeln.

## Teacher In Real Class
- Startability: Schnell startbar; Kinderpfad ist klar, Hilfe ist direkt sichtbar.
- Observable evidence: Lehrkraft kann sehen, ob das Kind Steine legt, eine Zahl auswählt und welche Hilfe gebraucht wird.
- Missing observation: Die reduzierte Kinderfläche könnte noch konsequenter vom Lehrkraftbereich getrennt sein; eine echte Tablet-/Mobilprüfung fehlt in diesem Lauf.

## Works
- Browser wurde geprüft: Ja, lokal unter `http://127.0.0.1:5173/`.
- Build wurde geprüft: Ja, `npm run build` wurde versucht, aber scheiterte wegen fehlender/ungültiger Rolldown-Native-Bindings.
- Nutzbarer Pfad bestätigt: `Start → Mengen legen → zwei Steine → 2 → "Passt. Die Menge ist gelegt."`
- Hilfefunktionen sind vorhanden: Hilfe, Weniger Auswahl, Pause, Nochmal, Lehrkraft-App.

## Breaks
- Der Build ist im aktuellen Setup nicht verlässlich, weil Vite/Rolldown die Native-Bindung nicht laden kann.
- Eine echte schmale Viewport-Prüfung wurde in diesem Lauf nicht durchgeführt.
- Die Lehrkraft-Hinweise bleiben eher textnah; für schnelle Praxis könnte die Oberfläche noch ruhiger sein.

## Needed Help
- Vormachen und gemeinsam legen.
- Auswahl reduzieren.
- Noch einmal neu starten.
- Erst danach die passende Zahl wählen.

## Verdict
- Status: small fix
- Biggest blocker: Nicht die Lernhandlung selbst, sondern die noch nicht vollständig geprüfte Schmalansicht und der buildseitige Rolldown-Fehler im lokalen Setup.
- Smallest useful fix: Den schmalen Viewport und die ruhige Kinderfläche einmal gezielt prüfen; falls nötig nur die Dichte der oberen Lehrkraft-/Navigationszone nachziehen.

## Next Micro-Prompt
Prüfe ausschließlich den Spielraum „Mengen legen“ auf schmalem Viewport: wirkt die Kinderfläche noch ruhig genug, sind die großen Touchziele weiterhin gut erreichbar, und stört die obere Lehrkraft-/Navigationszone den Kindermodus? Kein neuer Inhalt, nur Sichtbarkeit, Abstände und Flow beurteilen.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: schmale Viewport-Prüfung fuer „Mengen legen“ gezielt nachholen.
- CHRIS_ENTSCHEIDET: Ob der Rolldown-/Vite-Buildfehler lokal durch Neuinstallation behoben oder mit Build-Fallback weitergearbeitet werden soll.
- BEOBACHTEN: Ob Lehrkraft-Hinweise im Spielraum im Alltag zu textlastig wirken.
- SPAETER: Eine noch ruhigere Trennung von Kinderfläche und Lehrkraftbereich, falls weitere Spielräume ähnlich wirken.
- BLOCKIERT: nicht geprueft: echter Tablet-/Mobiltest in diesem Lauf.
- NICHT_TUN: Kein neuer Spielraum und keine neue Navigation, bevor „Mengen legen“ als Referenz ruhig genug ist.
- Naechste kleinste Aktion: Schmalen Viewport in einer eigenen kurzen Prüfrunde testen.
- Beleg / Datei: /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/testpilot-2026-05-28.md
