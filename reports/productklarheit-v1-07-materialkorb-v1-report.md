# Productklarheit v1 - 07 Materialkorb v1 Report
## Alpha-73A Druckvorbereitung

**Kurzdiagnose:**
Implementierung eines kompakten, lehrkraftzentrierten Materialkorbs für das Alpha-73A Wortpaket. Der Materialkorb dient als Vorbereitungsliste für gedruckte Wortkarten und bietet Übersicht über Domäne, Silben, Grapheme und Komplexität.

**Umsetzung:**
1.  **LeseWerk Lehrerbereich (src/App.tsx):**
    *   `Alpha73MaterialkorbView` hinzugefügt: Eine neue Sektion oberhalb des Inventars, die gewählte Wörter in einer kompakten Liste zusammenfasst.
    *   `Alpha73InventoryView` erweitert: Jede Wortkarte im Inventar hat nun einen "Vorbereiten"-Button zum Hinzufügen/Entfernen aus dem Korb.
    *   State-Management: `materialkorbSelectedIds` verwaltet die Auswahl lokal.
    *   Deeplink-Support: Der Ankunftshinweis (`view=alpha73a`) enthält nun einen Anker-Link direkt zum Inventar/Materialkorb.
2.  **Usability & Stil:**
    *   Kompaktes Design für scannbare Vorbereitung.
    *   "Druckansicht"-Button (löst `window.print()` aus) für schnellen Transfer.
    *   Grapheme- und Komplexitäts-Tags (`tag-advanced` / `tag-child`) zur schnellen Einordnung.
3.  **Sicherheit & Architektur:**
    *   Keine neue Datenbank, kein Cloud-Sync, keine externen Assets.
    *   Nutzung der bestehenden `getAlpha73Inventory` Datenquelle zur Vermeidung von Redundanz.
    *   Vermeidung von Druck-Sprache (Druck, Timer, Bewertung).

**Prüfung:**
*   `npm test -- --run`: Alle 239 Tests erfolgreich bestanden.
*   `npm run build`: Build-Vorgang erfolgreich abgeschlossen.
*   **Pressure-Check:** Es wurde keine leistungs- oder zeitdruckorientierte Sprache in den neuen Texten verwendet. Begriffe wie "Vorbereiten", "Sichten", "Ruhig" wurden beibehalten.
*   **Accessibility:** Sektionen sind über IDs (`#alpha73-materialkorb`, `#alpha73-inventory`) und `aria-label` korrekt markiert.

**Geänderte Dateien:**
*   `src/App.tsx`: UI-Komponenten und State für Materialkorb.
*   `src/styles.css`: Styles für Materialkorb-Sektion und -Items.

**Risiken:**
*   Druck-Layout: Der `window.print()` Befehl nutzt das Standard-Browser-Verhalten; ein spezifisches Print-Stylesheet für A4-Karten-Optimierung wurde noch nicht implementiert (wie im Stop-Condition gefordert).

Datum: 2026-05-31
Status: Fertiggestellt (Slice v1)
