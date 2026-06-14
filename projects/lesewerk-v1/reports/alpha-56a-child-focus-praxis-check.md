# Alpha 56A – Child Focus Praxis Accessibility Check

## Kurzurteil
Grün: Die Sichtbarkeit von „Jetzt“ und „Danach“ wirkt im aktuellen Stand in 1–2 Sekunden gut erfassbar. Für Desktop und schmale Mobile-/Tablet-Breiten sehe ich keine ausreichend starke Barriere, die einen weiteren Mini-Patch rechtfertigt.

## Entscheidung
A) Kein Code-Change nötig. Alpha 56B kann übersprungen werden; Alpha 57 kann als kleiner Praxis-/Nutzungsloop starten.

## Evidenz
- Die Kinderpfad-Orientierung ist mehrfach und konsistent im UI verankert:
  - `Jetzt lesen: ...` und `Danach: ...` in der Leseleiter
  - `Jetzt: ... · Danach: ...` in der Orientierungskarte
  - aktive und nächste Schritte sind zusätzlich über Pille/Statusmarkierung visuell hervorgehoben
- Die visuelle Hierarchie ist ruhig und klar:
  - der aktuelle Schritt hat dunklere, stärkere Hervorhebung
  - der nächste Schritt ist sichtbar, aber zurückhaltender
  - keine laute, überladene oder wechselnde Darstellung
- Mobile/Tablet-Risiko wirkt kontrolliert:
  - die Child-Progress-Leiste wechselt unter 760px auf eine einspaltige Struktur
  - die Schrittleiste darf horizontal scrollen statt zu überlaufen
  - die geführte Übergangskarte stapelt sich unter 760px ebenfalls einspaltig
  - bei sehr schmalen Breiten werden weitere Inhaltsgitter auf eine Spalte reduziert
- Aus dem Code ist keine erkennbare horizontale Überfrachtung des Kinderpfads ersichtlich; die Breakpoints sind bereits auf kleine Breiten vorbereitet.

## Begründung
Der Kinderpfad ist nicht nur beschriftet, sondern doppelt geführt: textlich über „Jetzt/Danach“ und visuell über Hervorhebung und Schrittmarkierung. Für eine GE-Praxis ist das ausreichend schnell scannbar, ohne zusätzliche Komplexität einzubauen.

## Risikoabwägung
- Restunsicherheit: Die tatsächliche Wahrnehmung auf einem sehr kleinen, hellen oder ungünstig eingestellten Gerät kann immer etwas anders ausfallen als im Browser-Layout.
- Aber: Es gibt im aktuellen Stand keine klare Schwäche, die vor dem nächsten kleinen Praxisloop noch einmal technisch nachgeschärft werden müsste.

## Empfehlung für Alpha 57
- Nicht weiter an Copy oder Layout drehen.
- Stattdessen einen sehr kleinen Praxischeck / Nutzungsloop planen: Desktop + schmale Breite kurz gegenlesen, ob Kinder „Jetzt“ und „Danach“ ohne Erklärung sofort finden.

## Datenschutznotiz
Kein personenbezogenes Material verwendet. Der Check bezieht sich nur auf anonyme Layout- und Leseführung im Kinderpfad.
