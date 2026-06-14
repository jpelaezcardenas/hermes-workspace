# S-Tier All-Areas Qualitätsmatrix - LeseWerk V1 - 2026-05-31

## Status-Übersicht

| Bereich | Aktueller Stand | Risiko | S-Tier-Lücke | Kleinster Slice |
| :--- | :--- | :--- | :--- | :--- |
| A. Kinderpfad | Funktional, aber viele Orientierungsschritte sichtbar. | Überforderung durch zu viele Kacheln/Optionen beim Start. | Fehlende "Eine-Sache-Focus" Einstiegsanimation/Ruhe. | Reduktion der Initial-Sicht auf nur ein Action-Element. |
| B. Vollbild / Shell | Vorhanden (`focus-game-shell`), wird für Missionen genutzt. | Brüche beim Beenden oder Wechseln der Modi. | Navigation innerhalb der Shell wirkt noch "Web-Like" (Bar oben). | Immersive Shell-Bar-Veredelung & Fullscreen-API-Check. |
| C. Lese-Mission | Hochwertige lokale Symbole vorhanden, 3-Schritt-Logik steht. | Wiederholung ohne Spielhandlung ("Karte + Weiter"). | Fehlende Belohnungs-Micro-Momente ohne Scores/Punkte. | Sanfte haptische/visuelle Bestätigung nach Wort-Abschluss. |
| D. Mini-Reisen | Premium-Muster steht für Mama/Sofa/Tasse. | Inkonsistenz bei neuen Familien (Wortschatz-Ausbau). | Nicht alle Alltagswörter haben das Premium-5-Stationen-Set. | Veredelung der "Start-Animation" für jede Reise. |
| E. Lesegeschichten | Einfache Geschichten & Verständnisfragen integriert. | Textlastigkeit bei schmalen Bildschirmen. | Illustrationen sind nur CSS-Shapes (didaktisch ok, aber abstrakt). | Optimierung der Satz-Segmentierung (Fokus auf einen Satz). |
| F. Diagnostik | Lokal, nicht-bewertend, Lehrer-Summary vorhanden. | Lehrer-Bereich wirkt technisch ("Dashboard"). | Fehlende visuelle Brücke von Beobachtung zu Materialkorb. | "Empfehlungs-Badge" im Lehrer-Bereich prominenter setzen. |
| G. Wortschatz | Alpha-73A Paket (16 Alltagswörter) integriert & gegated. | Grapheme-Gating könnte zu restriktiv oder zu offen sein. | "Schwere" Wörter haben teils noch keine spezifischen Hilfen. | Spezifische Gebärden-Texte für alle 16 Wörter prüfen. |
| H. Design / Tablet | CSS-Grid-Layout, touch-safe Buttons (>72px). | Overlap bei sehr kleinen Viewports (320px). | "Neva"-Figur ist narrativ vorhanden, aber visuell kaum sichtbar. | Einführung eines subtilen Neva-Visual-Ankers (CSS-Shape). |

## Priorisierung & Entscheidung

Der High-Impact-Slice für diese Runde ist die **Vollbild-/FocusGameShell-Veredelung (Bereich B)** in Kombination mit einer **klareren Startlogik (Bereich A)**. 

**Begründung:** 
Das "App-Feeling" steht und fällt mit dem Moment, in dem das Kind aus der Auswahl in die Aktivität springt. Wenn hier die Web-Struktur (Browser-Anmutung) verschwindet und ein ruhiger, fokussierter Spielraum entsteht, ist der größte S-Tier-Sprung geschafft.

## Gewählter Slice: "Universeller Spielstart-Fokus"

- **Ziel:** Die `focus-game-shell` bekommt einen sanfteren, immersiveren Einstieg.
- **Maßnahme:** Integration der Fullscreen-Aktivierung (optional/Hinweis) und Deaktivierung aller Hintergrund-Elemente durch eine robustere Overlay-Logik in `App.tsx` und `styles.css`.
- **Risiko:** Gering, da bestehende Modi (Lese-Mission, Mini-Reisen) bereits die Shell nutzen.
