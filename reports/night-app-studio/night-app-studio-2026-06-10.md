# Night App Studio - 2026-06-10
Status: GEBAUT
Mode: BUILD_NEW
App des Morgens: Vertretungsstunden-Assistent GE
Why selected: Die letzten drei App-Familien waren Hermes Morning Cockpit, Materialkorb/Kartenmacher und S-Kiste. Heute wurde bewusst eine andere, morgen praktisch nutzbare Spur gewählt: fachfremde oder spontane Vertretung in GE. Der Prototyp ist kein weiterer Morgenkarten- oder Materialgenerator, sondern eine kleine Entscheidungs-App mit sichtbarer Ablaufkarte: Situation wählen, Karte bauen, vier sichere Handlungsschritte mitnehmen. Er passt zur aktuellen Teacher-Nextday-Spur, bleibt aber unabhängig von Gartenpost, S-Kiste und Fuenferfeld.
Recent repeat check: Letzte 3 Reports gelesen: 2026-06-09 S-Kisten-Starter, 2026-06-08 Materialkorb-Kartenmacher, 2026-06-07 Hermes Morning Cockpit Slice. Fuenferfeld ist geparkt und wurde nicht gewählt. Kein Chris-Feedback mit realer Nutzung vorhanden; deshalb kein V2 eines ungetesteten Prototyps. Die neue App-Familie ist Vertretungs-/Notfallstunden-Assistent.
Score before caps: 9/10
Score caps applied: Keine Score-Caps angewendet. Screenshot/visuelle Prüfung vorhanden. Es ist nicht nur ein Formular oder reiner Textgenerator, weil die Auswahl die sichtbare Vertretungskarte verändert und ein vollständiger 60-Sekunden-Flow geprüft wurde. Vollständiger 60-Sekunden-User-Flow demonstriert. Keine Duplikation einer bestehenden Idee.
Final score: 9/10
Proof:
- Screenshot: geprüft mit Browser-Vision; Screenshot-Datei: `/Users/zondrius/.hermes/profiles/neva/cache/screenshots/browser_screenshot_bdfa7fb05f4c4a36a362a2a50bff01b4.png`. Ergebnis: App-artige Oberfläche, Auswahlchips, vier Schrittkarten und keine offensichtlichen Layoutfehler im sichtbaren Bereich.
- 60-second flow: `open /Users/zondrius/hermes-workspace/projects/night-lab/2026-06-10-vertretungsstunden-assistent-ge/index.html`; dann `unruhig` -> `gar nichts sicher` -> `5 Min` -> `Karte bauen`. Ergebnis: Karte zeigt kurzen Start, Körperzeichen-Handlung, eine Hilfe und Fertig-Ritual.
- App feeling: Auswahlchips verändern sichtbar die Karte; die vier Schrittkarten wirken wie ein kleiner Assistent, nicht nur wie ein statischer Text.
What exists: Lokaler Prototyp unter `/Users/zondrius/hermes-workspace/projects/night-lab/2026-06-10-vertretungsstunden-assistent-ge/` mit `index.html` und `README.md`.
How to open/test: `open /Users/zondrius/hermes-workspace/projects/night-lab/2026-06-10-vertretungsstunden-assistent-ge/index.html`. Danach in unter einer Minute Situation wählen, `Karte bauen` klicken und prüfen, ob die Vertretungskarte ohne personenbezogene Daten verständlich ist.
Risks: Pädagogisch bleibt es eine generische Notfallkarte, kein Ersatz für Klassenwissen, Unterstützte Kommunikation oder individuelle Absprachen. Eine fachfremde Person könnte trotz Datenschutz-Hinweisung reale Namen ergänzen, wenn der Ablauf später um Notizen erweitert würde; deshalb keine Eingabefelder für Personendaten ergänzen. Drucklayout ist nur grob angelegt, nicht intensiv geprüft.
Cost/Scope Guard: Lokal, statisch, keine externen APIs, keine Accounts, keine Tokens, kein Scraping, kein Deploy, kein Commit, kein Push, keine Installationen, keine Änderungen an bestehenden Apps oder aktiven Hermes-/Lernwerkstatt-/LeseWerk-Dateien.
Morning decision: BEHALTEN
Next recommendation: Chris sollte den Prototyp nur 5 Minuten auf Plausibilität testen: Versteht eine fachfremde Person die Karte sofort? Wenn ja, nächste Verbesserung höchstens ein lokales Druck-/Ein-Seiten-Layout; wenn nein, Familie parken.

## Befehlskarte
- Open/Test-Befehl: Öffne lokal `/Users/zondrius/hermes-workspace/projects/night-lab/2026-06-10-vertretungsstunden-assistent-ge/index.html`, wähle `unruhig`, `gar nichts sicher`, `5 Min`, klicke `Karte bauen` und prüfe, ob die vier Schritte in 60 Sekunden als sichere Vertretungsstunde verständlich sind.
- V2-Codex-Befehl: /goal Verbessere lokal den Prototyp `/Users/zondrius/hermes-workspace/projects/night-lab/2026-06-10-vertretungsstunden-assistent-ge/` um genau einen kleinen Slice: ein druckfreundliches Ein-Seiten-Layout mit klarer Überschrift, vier Schrittkarten und Datenschutz-Hinweis. Akzeptanz: `index.html` bleibt standalone, der bestehende 60-Sekunden-Flow funktioniert weiter, README nennt den Test. Grenzen: no external APIs, no accounts, no deploy, no commit, no push, no sensitive data.
- Hermes-Pruefbefehl: Morgen prüfen, ob Chris den Vertretungsstunden-Assistenten real geöffnet/getestet hat; ohne Feedback keine V2 als bewährt behandeln.
- Stop-/Park-Befehl: Stoppen/parken, wenn der Assistent wie eine generische Beschäftigungskarte wirkt, individuelle Sicherheitsabsprachen ersetzt oder nach 60 Sekunden nicht sofort verständlich ist.
- Nicht-ausfuehren: Keine Schülerprofile, keine Diagnosen, keine Namenslisten, keine Vertretungsdatenbank, keine Cloud-Synchronisation, kein Export mit personenbezogenen Daten, kein Fuenferfeld-Slice.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: Prototyp einmal lokal öffnen und den 60-Sekunden-Flow testen.
- CHRIS_ENTSCHEIDET: Ob die nächste Verbesserung wirklich ein Drucklayout sein soll oder ob die Vertretungs-Assistent-Familie nach Sichttest geparkt wird.
- BEOBACHTEN: Ob Vertretungs-/Notfallkarten im GE-Alltag nützlicher sind als weitere Material- oder Morgenkarten-Slices.
- SPAETER: Eine zweite Variante für „Material vorhanden: Bildkarten/Gegenstände“ erst nach realem Sichttest.
- BLOCKIERT: Kein Chris-Feedback zur realen Nutzung der vorherigen Night-App-Prototypen vorhanden.
- NICHT_TUN: Kein V2 auf Basis behaupteter Nutzung bauen; keine sensiblen Schülerdaten, Accounts, externen Dienste oder bestehenden Lernwerkstatt-/LeseWerk-Dateien anfassen.
- Naechste kleinste Aktion: `open /Users/zondrius/hermes-workspace/projects/night-lab/2026-06-10-vertretungsstunden-assistent-ge/index.html`
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/night-app-studio/night-app-studio-2026-06-10.md`
