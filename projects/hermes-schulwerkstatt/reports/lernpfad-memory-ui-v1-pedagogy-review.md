# Pädagogisches & Privacy Review: Lernpfad-Memory UI v1

## 1. Förderplanung vs. Klinische Diagnose (Status: Konform)
- **Umsetzung:** Die UI nutzt konsequent den Begriff "Arbeitshypothese" und "Lernnotiz". Es gibt keine Felder für ICD-Codes, medizinische Diagnosen oder IQ-Werte.
- **Bewertung:** Unterstützt die pädagogische Förderplanung im GE-Bereich hervorragend, da sie den Fokus auf Beobachtung und hilfreiche Unterstützung legt, statt auf Defizitzuschreibungen.

## 2. Neutrale Labels & Ranking-Freiheit (Status: Erfüllt)
- **Labels:** Die geforderten Labels "Hand dabei", "kurz gezeigt" und "alleine versucht" sind als klickbare Chips implementiert (Zeilen 1415-1417).
- **Wirkung:** Diese Labels sind rein beschreibend (Hilfegrad) und vermeiden eine Notenlogik (1-10) oder ein Ranking. Sie sind im GE-Alltag präzise beobachtbar.

## 3. Schutz des Kindmodus (Status: Kritisch/Nachbesserung empfohlen)
- **Beobachtung:** Der "Kindermodus" (ab Zeile 795) ist eine Vorschau innerhalb der Lehreransicht. Es gibt einen Button "Kindermodus im Vollbild starten" (Zeile 810).
- **Risiko:** Innerhalb des Vollbild-Overlays gibt es im Footer (Zeile 840) Links wie "Zurück zum Förderkreislauf" oder "Zur Bibliothek". In einer echten 1:1 Situation könnte ein Kind durch versehentliches Klicken/Tippen zurück in die Lehrer-Ansicht mit Daten-Export-Buttons gelangen.
- **Empfehlung:** Für eine echte "Schutzmauer" sollten Lehrer-Navigationen im Vollbild-Modus nur durch eine bewusste Interaktion (z.B. Langdruck oder spezifische Geste) erreichbar sein.

## 4. Anonymität & Nützlichkeit des Exports (Status: Vorbildlich)
- **Anonymität:** Die Profile werden nur über Farben ("Rot", "Blau" etc.) gesteuert (Zeilen 1390-1393). Es gibt keine Namensfelder.
- **Sicherheits-Gate:** Ein Consent-Overlay (Zeile 1459) zwingt die Lehrkraft, vor dem Kopieren in die Zwischenablage die Anonymität zu bestätigen ("Wichtig: Bitte prüfe noch einmal...").
- **Nützlichkeit:** Der Export-Text ist kompakt und enthält genau die für die Team-Absprache relevanten Felder (Anker, Unterstützung, nächster Schritt).

## 5. Nächster-Schritt-Formulierung (Status: Erfüllt)
- **Prüfung:** Das Placeholder-Beispiel "Silbe Ma zu Wort Mama erweitern" (Zeile 1423) ist GE-spezifisch, klein und realistisch. Die UI regt dazu an, in kleinen Slices zu denken.

## 6. Verborgene Risiken & Didaktik (Status: Gering)
- **Farben/Text:** Die Farbwahl ist ruhig (Soft-Tones), die Textmenge ist für Lehrkräfte angemessen. Im Kindmodus (Vorschau) ist die Ablenkung minimal.
- **Sprache:** Keine Defizit-Sprache. Die "Offene pädagogische Frage" (Zeile 1427) fördert die forschende Haltung der Lehrkraft.

---

### Empfohlene Korrekturen (Mini-Fixes):
1. **Button-Wording:** Der Button `memoryExportAction` ("Export vorbereiten") ist gut, aber das Consent-Overlay könnte den Button "Export kopieren & Schließen" deutlicher als "Anonymisierten Text kopieren" labeln, um die Methode des Datentransfers (Clipboard) klarer zu machen.
2. **Kindmodus-Barriere:** Im `child-overlay-footer` sollten die Zurück-Links für Kinder weniger prominent oder durch eine Lehrer-Geste geschützt sein.

**Zusammenfassend:** Die UI v1 erfüllt die hohen Datenschutz- und pädagogischen Anforderungen für die GE-Schulwerkstatt. Sie ist ein sicheres Werkzeug, das die professionelle Beobachtung stärkt, ohne Datenrisiken einzugehen.