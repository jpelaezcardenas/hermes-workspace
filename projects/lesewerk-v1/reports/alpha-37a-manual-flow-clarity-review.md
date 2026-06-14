# Alpha 37A – Manuelle Serien- und Tagesweglogik klären

## Ampel
Gelb mit grünem Kern.

Die aktuelle Logik ist fachlich schon recht sicher getrennt: Serien können nur markiert werden, und der Tagesweg wird erst durch eine bewusste Lehrkrafthandlung übernommen. Das ist gut. Gelb bleibt, weil die Beschriftung an zwei Stellen noch Missverständnisse zulässt: „Serie nur markieren“ klingt nach einer reinen Auswahl, während „In Tagesweg übernehmen“ und die Statusmeldung nicht sofort klar machen, was genau sich wann verändert.

## Ist-Fluss
1. Lehrkraftbereich öffnen.
2. Im Serienpanel eine Unterrichtsserie ansehen und per Button „Serie nur markieren“ auswählen.
3. Unterhalb im Bereich „Tagesweg wählen“ Karten manuell auswählen oder den sicheren Standardpfad beibehalten.
4. Im Vorschlagsbereich kann die Lehrkraft den nächsten Tagesweg separat per Button „In Tagesweg übernehmen“ annehmen.
5. Erst dieser manuelle Klick setzt den Tagesweg um; der Kinderpfad bleibt bis dahin unverändert.

Relevante Stellen:
- `src/App.tsx:613-617` – Serienpanel steht vor der Tagesweg-Wahl.
- `src/App.tsx:979-1015` – Serienkarte mit „Serie nur markieren“ und Hinweis, dass Markierung den Tagesweg nicht ändert.
- `src/App.tsx:687-715` – separater Vorschlagsbereich mit „In Tagesweg übernehmen“ und Statushinweis.
- `src/App.tsx:293-303` – technische Umsetzung: Übernahme setzt `selectedDailyPathIds`, Ignorieren ändert nur den Status.

## Missverständnis-Risiken
- „Serie nur markieren“ kann als „ich habe mich entschieden, also ist es schon aktiv“ gelesen werden.
- „Serie markiert · noch nicht übernommen“ ist fachlich korrekt, aber sprachlich etwas doppelt und leicht sperrig.
- „In Tagesweg übernehmen“ ist verständlich, aber nicht explizit genug, dass damit der Kinderpfad wirklich erst jetzt verändert wird.
- Zwei unterschiedliche Steuerlogiken stehen nah beieinander: Serienauswahl und Tagesweg-Auswahl. Das ist fachlich sinnvoll, kann aber ohne Klartext-Hinweis wie ein einziger Workflow wirken.
- Die Statusmeldung unten ist gut, kommt aber erst nach der Aktion; sie verhindert Missverständnisse nicht vollständig vor dem Klick.

## Konkrete Microcopy-/UI-Empfehlung für Alpha 37B

### 1. Die drei Zustände sprachlich sauber trennen
Empfohlene Dreierlogik:
- Serie ansehen / vormerken
- Tagesweg manuell übernehmen
- Kinderpfad bleibt unverändert bis zur Übernahme

### 2. Buttontexte vereinfachen und handlungsnäher machen
Empfohlene Texte:
- statt „Serie nur markieren“ → „Serie vormerken“ oder „Nur vormerken“
- statt „Serie markiert · noch nicht übernommen“ → „Vorgemerkt – noch nicht im Tagesweg“
- statt „In Tagesweg übernehmen“ → „In Tagesweg übernehmen und aktivieren“ oder kürzer „Tagesweg übernehmen“

Wenn die UI sehr ruhig bleiben soll, ist „Serie vormerken“ die beste Variante. Das ist weniger technisch als „markieren“ und weniger endgültig als „auswählen“.

### 3. Ein kurzer Klartext direkt am Serienpanel
Direkt unter der Überschrift oder vor dem ersten Button ein Satz wie:
- „Hier nur Serie vormerken. Der Kinderpfad ändert sich erst unten bei der manuellen Tagesweg-Wahl.“

Das reduziert die Gefahr, dass die Lehrkraft die Serienmarkierung für eine automatische Übernahme hält.

### 4. Den Vorschlagsbereich eindeutiger machen
Oben im Vorschlagsbereich ein Mini-Hinweis:
- „Das ist nur ein Vorschlag. Erst mit Klick wird der Tagesweg geändert.“

Optional als Statuszeile nach Klick:
- „Tagesweg übernommen. Der Kinderpfad nutzt jetzt diese Auswahl.“
- „Vorschlag verworfen. Der Kinderpfad bleibt unverändert.“

### 5. Visuelle Trennung zwischen Vormerken und Übernehmen
Wenn Alpha 37B noch kleine UI-Arbeit erlaubt, wäre eine klare visuelle Staffelung hilfreich:
- Serienpanel: ruhiges, helles Card-Design mit Badge „Vorschau“
- Tagesweg-Bereich: klar als Entscheidungsbereich markiert
- Übernahme-Button: stärker hervorgehoben als das Vormerken

So wird nicht nur sprachlich, sondern auch optisch klar: Vormerken ist nicht aktivieren.

## Klare Nicht-Ziele
- Keine automatische Übernahme der Serie in den Tagesweg.
- Keine verdeckte Änderung des Kinderpfads durch Serienmarkierung.
- Keine neuen Funktionen wie Auto-Mapping, Smart Transfer oder Regel-Engine.
- Keine zusätzliche Diagnose-, Score-, Timer-, Cloud-, Login- oder Exportlogik.
- Keine Erweiterung des Kinderpfads um Serienbegriffe oder Lehrkraftlogik.
- Kein Umbau der fachlichen Struktur; nur Klarheit in Sprache und UI.

## Kurzfazit für Alpha 37B
Die Trennung ist schon richtig angelegt. Für den nächsten Schritt sollte Alpha 37B vor allem die Begriffe schärfen und die zwei Handlungsebenen sichtbar auseinanderziehen: Serie vormerken ist nicht Tagesweg übernehmen. Genau diese Differenz sollte die Oberfläche sofort verständlich machen.
