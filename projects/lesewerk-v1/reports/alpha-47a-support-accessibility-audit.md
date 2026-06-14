# Alpha 47A – Hilfeblock Accessibility-Audit

## Current state
- Der kindliche Hilfebereich liegt im Tagespfad als eigener, manueller `details`-Block: `Hilfe wählen` mit dem Satz `Hilfe ist freiwillig.`.
- Die Support-Optionen werden darunter als `SupportPanel` gerendert; die Buttons sind bereits groß genug und haben klare Fokus-Stile.
- Der Bereich ist funktional sicher und ruhig, aber auf sehr kleinen Displays noch relativ textlastig: `support-status-row`, `details`-Summary, ein erklärender Satz und dann die Optionen.
- Aus `alpha-46c-watchdog-review.md` ist bereits bestätigt: keine neuen Inhalte, keine Automatiken, keine Score-/Timer-/Ranking-Logik, keine externen Assets, keine automatische Übertragung aus der Lehrkraftvorschau.

## 3 mögliche Micro-Verbesserungen
1. Visuelle Verdichtung des Support-Kopfs
   - `Hilfe wählen` + `Hilfe ist freiwillig.` stärker als kompakter Kopfraum bündeln, damit die Supportkarte auf kleinen Displays schneller scannbar wird.

2. Noch ruhigere Hierarchie im geöffneten Zustand
   - Den Abstand zwischen Summary, Hinweistext und Option-Buttons reduzieren und den oberen Rand des Support-Blocks ruhiger machen.

3. Klare Trennung von Status und Auswahl
   - Den aktuellen Unterstützungsstatus und die Auswahloptionen optisch stärker voneinander trennen, damit Kinder zuerst den ruhigen Einstieg sehen und erst danach die aktive Auswahl.

## Empfehlung für 47B: kleinster sicherer Implementierungsschritt
Ich empfehle als kleinsten sicheren Schritt eine rein visuelle Verdichtung der Support-Karte im geöffneten Zustand, ohne neue Funktion:

- `details.support-details` bekommt eine etwas kompaktere innere Struktur.
- Der Hinweis `Hilfe ist freiwillig.` bleibt erhalten, wird aber näher an die Summary gerückt und optisch als kurzer Untertitel behandelt.
- Optional nur CSS: etwas weniger Innenabstand, leicht reduzierte Abstände zwischen Summary, Absatz und `SupportPanel`.

Warum gerade das:
- Es verbessert die Scanbarkeit auf sehr kleinen Screens sofort.
- Es verändert keine Logik, keine Inhalte und keine Bedienwege.
- Es passt zu GE-Lernenden, weil der Einstieg ruhiger und eindeutiger wird, ohne zusätzliche Reize einzuführen.

## Exakte Acceptance Criteria für 47B
- Der Supportbereich bleibt als manuelles `details`-Element erhalten.
- Der Text `Hilfe ist freiwillig.` bleibt sichtbar.
- Es werden keine neuen Hilfen, Aufgaben, Symbole oder Lerninhalte ergänzt.
- Es gibt keine automatische Übertragung in den Tagesweg und keine neue Speicherung.
- Die Support-Buttons bleiben mindestens so gut bedienbar wie vorher.
- Auf sehr kleinen Displays wirkt der Hilfeblock optisch kompakter und klarer als in Alpha 46C.
- Keine Änderungen an Score, Timer, Ranking, Login, Cloud, Upload oder Export.
- Keine externen oder geschützten Bild-/Symbolassets.

## Risiken
- Zu starke Verdichtung könnte die Lesbarkeit verschlechtern, wenn Abstände zu knapp werden.
- Wenn nur der Abstand reduziert wird, ohne die Hierarchie sauber zu halten, kann der Block optisch „zusammenschieben“ und unruhig wirken.
- Eine Änderung an der Supportkarte sollte nicht in andere Bereiche ausstrahlen, damit der übrige Tagespfad unverändert ruhig bleibt.

## Kurzfazit
Der Hilfeblock ist bereits sicher und funktional. Der sinnvollste nächste Schritt ist keine neue Funktion, sondern eine kleine visuelle Beruhigung der geöffneten Supportkarte für sehr kleine Displays.