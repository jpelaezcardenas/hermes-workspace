# Alpha 48A – Leselogik Tagespfad Audit

## Current state
- Der Kinderpfad zeigt bereits einen ruhigen Einstieg mit "Tagespfad", "Heute lesen" und einer klaren Schrittanzeige: "Schritt x von y".
- Die Sequenz Bild → Silbe → Wort → Satz → Mini-Geschichte ist bereits als Orientierungssystem vorhanden:
  - `getChildOrientationSteps()` legt die Stufen mit Texten und Zuständen `done/current/next` an.
  - `getProgressionPathForProfile()` übergibt diese Stufen zusammen mit `currentAction`, `nextAction` und den `pathCards`.
- Im UI gibt es bereits eine Kopfzeile für den Tagespfad und eine kurze Hilfssprache für den Start.
- Auch in der Lehrkraftsicht sind Pfad, Vorschlag und sichere Auswahl bereits getrennt; es gibt keine automatische Übertragung in den Kinderpfad.

## Wo die Orientierung noch schwach ist
1. Die Stufenlogik ist fachlich vorhanden, aber im Kinderpfad nicht stark genug als Weg sichtbar. Die Nutzerin/der Nutzer sieht eher einen Starttext als einen Weg mit klarer Position.
2. Der aktuelle Schritt und der nächste Schritt sind in der Struktur angelegt, wirken aber eher indirekt über Hilfetexte als direkt über eine kleine visuelle Weganzeige.
3. Die Leselogik ist über mehrere Funktionen verteilt (`getChildOrientationSteps`, `getProgressionPathForProfile`, `guidedReadingChain`, Tagespfad-Header). Das ist sicher, aber für GE-Lernende noch nicht maximal sofort verständlich.

## 3 mögliche Micro-Verbesserungen
1. Aktuellen Schritt im Tagespfad deutlicher markieren
   - Zum Beispiel mit einer ruhigen, klaren Hervorhebung in der Schrittleiste.
   - Vorteil: größte Wirkung auf Orientierung, ohne neue Inhalte.

2. Direkt neben dem aktuellen Schritt einen kurzen "als Nächstes"-Hinweis ergänzen
   - Zum Beispiel: "Jetzt: Wort" / "Als Nächstes: Satz".
   - Vorteil: macht die Übergänge zwischen den Stufen verständlicher.
   - Risiko: nur sinnvoll, wenn sehr knapp gehalten.

3. Die Kindersprache der Weganzeige stärker an die Reihenfolge koppeln
   - Zum Beispiel eine kurze lineare Lesereihe mit einem einzigen Satz pro Stufe.
   - Vorteil: weniger kognitive Last.
   - Risiko: zu viel Text könnte den ruhigen Eindruck wieder schwächen.

## Empfehlung: kleinste sichere 48B-Implementierung
Meine Empfehlung ist eine minimal-invasive Ergänzung der bestehenden Schrittanzeige im Kinderpfad: den aktuellen Schritt und den nächsten Schritt direkt sichtbar machen, ohne neue Inhalte, ohne neue Routinen und ohne zusätzliche Bedienung.

Konkreter Zielpunkt:
- Die vorhandenen `done/current/next`-Stufen bleiben erhalten.
- Im Kinderpfad wird nur die visuelle und sprachliche Orientierung zwischen aktuellem und nächstem Schritt geschärft.
- Keine neuen Lerninhalte, keine neue Auswahl, kein zusätzlicher Navigationsschritt.

Warum genau diese Variante?
- Sie löst das fachliche Kernproblem: "Wo bin ich im Lesepfad?"
- Sie bleibt ruhig und klein.
- Sie ist näher an Teilhabe und Orientierung als weitere Layout-Politur.
- Sie vermeidet das Risiko, den Kinderblick mit weiteren Karten, Buttons oder Textblöcken zu überladen.

## Exakte Acceptance Criteria für 48B
- Der Kinderpfad macht den aktuellen Leseschritt eindeutig sichtbar.
- Der nächste Leseschritt ist zusätzlich in sehr kurzer Form erkennbar.
- Die Reihenfolge Bild → Silbe → Wort → Satz → Mini-Geschichte bleibt unverändert.
- Es werden keine neuen Inhalte eingeführt.
- Es entstehen keine Score-, Timer-, Ranking- oder Diagnoseelemente.
- Es gibt keine automatische Übernahme aus der Lehrkraftsicht.
- Der Kinderbereich wird nicht busier oder textlastiger als vorher.
- Die Lösung bleibt lokal, anonym und ohne Export/Upload/Login.

## Risiken
- Wenn die Hervorhebung zu stark ausfällt, könnte der ruhige Charakter des Kinderpfads verloren gehen.
- Wenn der "Nächster Schritt" zu ausführlich formuliert wird, steigt die Textlast gerade bei GE-Lernenden unnötig.
- Eine bloß visuelle Lösung ohne klare Sprache könnte für einige Kinder nicht reichen; deshalb sollte die Klarheit immer kurz sprachlich mitgetragen werden.
- Eine spätere Ausbaustufe könnte versucht sein, die Leselogik in zu viele Unterelemente zu zerlegen. Das sollte hier vermieden werden.

## Fazit
Alpha 48A sollte aus fachlicher Sicht nicht neue Inhalte bauen, sondern die vorhandene Leselogik sichtbarer machen. Die kleinste sichere Wirkung liegt darin, den aktuellen Schritt und den nächsten Schritt im Tagespfad ruhiger und direkter zu markieren. Das verbessert die Orientierung für GE-Lernende, ohne den Kinderpfad zu belasten.
