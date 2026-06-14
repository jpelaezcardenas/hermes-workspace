# Alpha 45A – Hilfebereich Accessibility-Audit

## Kurzbefund
Der Hilfebereich ist bereits bewusst reduziert, aber für den Kinderpfad noch etwas dicht, weil drei Elemente direkt aufeinander folgen:
- `ActiveSupport` mit Status-Chips
- `details.support-details` mit Einleitung und Umschalter
- `ChildRecommendation` als dritter Textblock

Auf Desktop wirkt das noch ok, auf kleineren Displays kann es aber schnell wie eine weitere Textwand neben dem Tagespfad wirken. Besonders die Mischung aus Statusanzeige, Umschaltfläche und Empfehlung erzeugt wenig visuelle Trennung.

## Beobachtung
- `.support-strip` ist ein eigener Block, aber visuell noch sehr nah an den anderen Karten.
- `ActiveSupport` zeigt Status + Chips in derselben Fläche wie die Steuerung.
- `support-details summary` ist zwar groß genug, aber der gesamte Bereich bleibt eher textlastig.
- `SupportPanel` ist funktional klar, aber ohne zusätzliche Ruhezone oder stärkere Gruppierung.
- `ChildRecommendation` steht direkt im selben Block und erhöht die Textdichte.

## Einschätzung
Der Bereich ist nicht falsch aufgebaut, aber noch nicht ruhig genug für einen GE-Kinderpfad. Das größte Problem ist nicht die Bedienbarkeit, sondern die gleichzeitige Sichtbarkeit mehrerer Hilfelayer ohne stärkere optische Hierarchie.

## Genau eine Alpha 45B-Empfehlung
Die Alpha 45B sollte den Hilfebereich in zwei klar getrennte Ebenen aufteilen: oben eine ruhige, kompakte Statuszeile für `ActiveSupport`, darunter eine klar abgegrenzte Support-Karte für `details` + `SupportPanel` mit etwas mehr Abstand und weniger textlicher Konkurrenz. Keine neuen Inhalte, nur visuelle Beruhigung und stärkere Trennung.

## Warum genau dieser Slice
- verbessert Lesbarkeit ohne neue Logik
- hält die Unterstützung manuell
- reduziert visuelle Dichte auf Mobilgeräten
- passt gut zu GE: kurze Orientierung, klare Fläche, wenig Ablenkung

## Datei geprüft
- `src/App.tsx`
- `src/styles.css`
