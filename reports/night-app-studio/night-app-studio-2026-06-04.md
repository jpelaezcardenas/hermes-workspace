# Night App Studio - 2026-06-04
Status: GEBAUT
App des Morgens: Lehrer-Morgenkarte GE
Why selected: Passt direkt zu Schule/GE, ist morgen nutzbar, klein genug fuer einen isolierten lokalen Prototypen und bleibt ohne sensible Daten oder externe Dienste.
Score: 10/10
What exists: Ein lokaler Mini-Prototyp unter `/Users/zondrius/hermes-workspace/projects/night-lab/2026-06-04-lehrer-morgenkarte-ge/` mit `index.html` und `README.md`. Die App erzeugt aus Bereich, Zeitfenster, Niveau und Material drei kurze Mini-Aktivitaeten.
How to open/test: `index.html` im Browser oeffnen, Dropdowns waehlen, `Morgenkarte bauen` klicken, Ergebnis pruefen, optional `Text kopieren` testen.
Risks: Clipboard-Funktion kann je nach Browser-Einstellung eingeschraenkt sein. Inhalt ist bewusst generisch; echte Unterrichtsqualitaet muss im Alltag getestet werden.
Cost/Scope Guard: Nur lokales HTML/CSS/JS, keine Installationen, keine externen APIs, keine Daten, kein Deploy, kein Commit, kein Push.
Next recommendation: improve

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: Den Prototyp morgen einmal im echten Unterrichtsalltag testen.
- CHRIS_ENTSCHEIDET: Ob daraus eine zweite Version mit Druckansicht, Favoriten oder Slot-Funktionen werden soll.
- BEOBACHTEN: Ob die 3-Aktivitaeten-Ausgabe im Alltag schnell genug ist und ob die Niveau-Logik passt.
- SPAETER: Falls der Test gut ist, einen kleinen Druck- oder Export-Slice ergaenzen.
- BLOCKIERT: nichts
- NICHT_TUN: Keine sensiblen Daten, keine externen APIs, keine Ausweitung auf grosse App-Plattformen.
- Naechste kleinste Aktion: Den `README.md`-Testschritt kurz im Browser pruefen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/projects/night-lab/2026-06-04-lehrer-morgenkarte-ge/index.html`
