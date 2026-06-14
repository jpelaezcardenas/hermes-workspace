# Lernpfad-Memory UI Design Polish (t_791d2286)

## Status: Entwurf der Verbesserungen

Das Lernpfad-Memory UI v1 wurde analysiert. Das Ziel ist ein ruhigeres, "app-näheres" Gefühl für Lehrkräfte.

### Geplante CSS-Anpassungen
- **Karten-Struktur**: `.memory-input-card` und `.memory-display-card` erhalten einheitlichere Padding/Border-Werte.
- **Badge-Visuals**: Die Profil-Badges erhalten einen dezenten `box-shadow` und bessere Zentrierung.
- **Support-Chips**: Die Klick-Ziele werden für Mobile auf min 48px Höhe optimiert (UX-Standard).
- **Abstände**: Die `control-row` erhält präzisere Margins für einen "Calm UI" Effekt.
- **Vorschau-Card**: Die Items in der Vorschau werden visuell dezent voneinander getrennt (Separator-Linien).

### Geplante HTML-Struktur-Anpassungen
- Keine funktionalen Änderungen, nur Klassen-Erweiterungen für besseres Styling.
- Hinzufügen von `aria-label` für bessere Screenreader-Unterstützung bei den Farbcodes.

### Mobile Optimierung
- Grid-Verhalten bei kleinen Viewports wird durch `grid-template-columns: 1fr` sichergestellt.
- Vergrößerung der Touch-Ziele für die Farbwahl.

---
*Dieser Report wird nach der Implementierung der CSS-Patches finalisiert.*
