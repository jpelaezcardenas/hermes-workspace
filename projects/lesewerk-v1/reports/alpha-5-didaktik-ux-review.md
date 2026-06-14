# LeseWerk Alpha 5 – Didaktik- und UX-Review

Stand: 2026-05-16

## Kurzfazit
Alpha 5 wirkt didaktisch insgesamt stimmig und im Kinderpfad ruhig geführt. Die adaptive Platzierung bleibt vorsichtig formuliert, die Storys sind kurz, verständlich und alltagsnah, und die UK-/Gebärdenhinweise sind textbasiert und konkret.

## Pass-Liste

- Adaptive Platzierung vermeidet Diagnose-, Score-, Ranking- und Notensprache.
- Die Vorschläge klingen bewusst unsicher und pädagogisch: „Heute passt vermutlich ...“.
- Beobachtbare Signale stehen im Vordergrund, nicht vermeintliche Fähigkeiten oder feste Stufen.
- Die Storys sind auf kurze, beantwortbare Mini-Formen begrenzt und bleiben deutsch, einfach und respektvoll.
- Die Gebärden-/UK-Hinweise sind konkret, alltagsnah und als Lesestütze formuliert.
- Der Kinderpfad bleibt ruhig: keine Timer, keine Drucksprache, keine Shame-Logik.
- Der Lehrerbereich benennt Beobachtung, Unsicherheit und den nächsten kleinen Schritt nachvollziehbar.

## Fix-Liste

### 1. Sichtbarer Versionsfehler im App-Header
Im sichtbaren UI-Header steht noch „LeseWerk Alpha 4 · lokale Demo“.
Das ist didaktisch nicht falsch, aber für die Alpha-5-Runde irreführend und sollte vor dem finalen Watchdog auf Alpha 5 korrigiert werden.

Empfohlene Mini-Korrektur:
- `src/App.tsx`: „LeseWerk Alpha 5 · lokale Demo“

### 2. Lehrertexte teils lang für den echten Bildschirmfluss
Die adaptive Erklärung ist fachlich sauber, kann im echten Klassenfluss aber schnell textlastig werden.
Die Aussage ist nicht zu lang im Sinne der Qualität, aber sie sollte im Pilot auf kompaktere Zeilen geprüft werden, damit sie in Stress- oder Übergangssituationen gut lesbar bleibt.

Mögliche spätere Feinjustierung:
- Einordnung, Begründung und nächsten Schritt noch stärker in Kurzzeilen aufteilen.

### 3. Auswahl-/Story-Dichte im realen Alltag prüfen
Die 12–18 Storys sind fachlich gut begründet, aber die Oberfläche sollte im Piloteinsatz auf Ruhe, Übersicht und eine klare Orientierung geprüft werden.
Besonders wichtig: Die Auswahl darf nicht wie ein Leistungsmenü wirken.

## Fachliche Bewertung nach Kriterien

### 1. Adaptive Platzierung
Bestanden.
Die Logik bleibt pädagogisch vorsichtig und beschreibt Beobachtung statt Eigenschaft. Das ist für GE passend.

### 2. Story-Qualität
Bestanden.
Die Stories sind kurz, nicht albern, nicht dekorativ und haben klare Fragen. Sie sind prinzipiell beantwortbar und anschlussfähig.

### 3. UK-/Gebärden-Hinweise
Bestanden.
Die Hinweise sind konkret und nicht irreführend. Gut ist, dass sie als Stütze und nicht als Ersatz des Lesens erscheinen.

### 4. Kindlicher Bedienfluss
Bestanden mit Beobachtungsbedarf.
Die Grundstimmung ist ruhig und entlastend. Im Pilot sollte noch geprüft werden, ob die Kombination aus Hilfeleiste, Auswahl und Storywechsel visuell sofort verständlich bleibt.

### 5. Lehrkraft-Evidenz
Bestanden.
Die Lehrerzusammenfassung erklärt Unsicherheit und nächsten Schritt. Das passt gut zu dokumentationsnaher GE-Praxis.

## Top-Risiken für den Pilot

1. Der alte Alpha-4-Header kann Verwirrung auslösen, obwohl die Funktion korrekt ist.
2. Der Lehrerbereich könnte auf kleineren Displays zu textreich wirken.
3. Die adaptive Auswahl muss im echten Unterricht darauf geprüft werden, ob sie noch als Hilfe und nicht als implizite Einordnung verstanden wird.
4. Die Story-Auswahl sollte nicht zu viele visuelle Entscheidungen gleichzeitig verlangen, besonders bei Kindern mit hohem Unterstützungsbedarf.

## Empfehlung

Vor dem finalen Watchdog nur die kleine Header-Korrektur in `src/App.tsx` mitnehmen, wenn sie noch offen ist. Danach ist Alpha 5 didaktisch und UX-seitig aus meiner Sicht pilotfähig, mit der offenen Aufgabe, die echte Bildschirmruhe und die Lesbarkeit des Lehrerbereichs im Alltag weiter zu beobachten.
