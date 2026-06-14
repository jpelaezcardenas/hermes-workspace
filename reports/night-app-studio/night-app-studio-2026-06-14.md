# Night App Studio - 2026-06-14
Status: GEBAUT
Mode: BUILD_NEW
App des Morgens: Night App Proof-Kiosk
Why selected: Heute wurde bewusst kein weiterer Unterrichts- oder V2-Prototyp gebaut, sondern ein kleiner Hermes-Morning-Cockpit-Slice fuer den blockierenden Proof-Loop. Feedback-Log und Proof-Ledger enthalten weiterhin keine echten Real-Entries; deshalb ist die nuetzlichste neue App kein Lernmaterial, sondern eine lokale TEST_CARD, die Chris in 60 Sekunden zu genau einer anonymen Proof-Ledger-Zeile fuehrt. Kandidaten kurz: 1) Hermes Morning Cockpit Slice/Proof-Kiosk 9/10 vor Caps, distinct und direkt gegen den aktuellen Engpass; 2) GE-Spielraum Gartenpost 8/10 vor Gate, aber zu nah an ungetesteter GE-Spielraum-Linie; 3) Materialkorb-Kartenmacher V2 7/10, ungetestete V2; 4) Vertretungsstunden-Assistent V2 7/10, ungetestete V2; 5) LeseWerk-Ministart 6/10, ohne aktuellen Proof nicht stark genug. Fuenferfeld/Five-frame wurde nicht beruehrt.
Recent repeat check: Letzte 3 Night-App-Reports gelesen: 2026-06-13 REVIEW_ONLY Proof-Loop, 2026-06-12 REVIEW_ONLY Proof-Gate fuer GE-Spielraum, 2026-06-11 `Fuell-Leer-Spielraum GE`. Die letzten zwei Laeufe haben den gleichen Blocker benannt: keine echte Proof-Ledger-Zeile. Der heutige Prototyp wiederholt keine GE-Spielraum-, Vertretungs-, S-Kisten-, Materialkorb- oder Morgenkarten-Familie, sondern macht den Proof-Schritt selbst sichtbar und schneller.
Score before caps: 9/10 (real tomorrow usefulness 2/2, distinctness from recent outputs 2/2, 60-second clarity 2/2, visible prototype proof 2/2, product learning potential 1/2). Produktlernen ist nur 1/2, weil der Kiosk selbst noch kein Unterrichtsprodukt beweist; er verbessert aber die Entscheidungsqualitaet fuer alle naechsten Builds.
Score caps applied: Keine Cap angewendet. Screenshot/visuelle Pruefung ist vorhanden. Die App ist nicht nur ein Formular oder reiner Textgenerator, sondern ein kleiner Proof-Kiosk mit Kandidatenkarten, Statuswahl, konkretem Open-Befehl und Ledger-Zeile. Ein kompletter 60-Sekunden-Flow wurde lokal geklickt: App waehlen, Status setzen, Ledger-Zeile sichtbar aktualisieren. Keine Duplikation einer bestehenden App-Familie; Datenschutz/Kosten sind Hard Gates und bestanden.
Final score: 9/10
Proof:
- Screenshot: /Users/zondrius/.hermes/profiles/neva/cache/screenshots/browser_screenshot_e368997766a14d27a0d7f3d08dc742e0.png
- 60-second flow: `open /Users/zondrius/hermes-workspace/projects/night-lab/2026-06-14-proof-kiosk-night-app/index.html`, dann `Vertretungsstunden-Assistent` waehlen, `hilfreich` klicken, pruefen, dass Open-Befehl und Ledger-Zeile sichtbar auf den gewaehlten Prototyp wechseln; lokal im Browser geklickt.
- App feeling: Kleine Cockpit-/Kiosk-Oberflaeche statt weiterer Ideenliste: drei Testkarten, Statusbuttons, Proof-Zeile und Kopieraktion bilden einen konkreten Entscheidungsflow.
What exists: Lokaler isolierter Prototyp mit `index.html` und `README.md` unter `/Users/zondrius/hermes-workspace/projects/night-lab/2026-06-14-proof-kiosk-night-app/`.
How to open/test: Im Terminal ausfuehren: `open /Users/zondrius/hermes-workspace/projects/night-lab/2026-06-14-proof-kiosk-night-app/index.html`. Danach in unter 60 Sekunden einen vorhandenen Night-App-Prototyp waehlen, den angezeigten `open ...`-Befehl nutzen, kurz testen, Status waehlen und die anonyme Ledger-Zeile manuell ins Proof-Ledger uebernehmen.
Risks: Der Kiosk beweist nicht, dass eine Unterrichts-App nuetzlich ist; er hilft nur, eine echte Rueckmeldung datensparsam zu erfassen. Die Ledger-Zeile darf keine echten Namen, Diagnosen, Fotos, Klassenlisten, Familieninfos oder individuellen Foerderdaten enthalten. `tested_useful` nur eintragen, wenn wirklich ein Sichttest stattgefunden hat.
Cost/Scope Guard: Keine externen APIs, kein Scraping, keine Accounts, keine Tokens, keine Browser-Logins, keine Installs, kein Deploy, kein Commit, kein Push. Keine Edits an bestehenden Apps, `src/**`, Hermes-Konfig, Handoff-Dateien, Cron-Dateien, Nayyal, GE-Lernwerkstatt oder LeseWerk. Es wurde genau ein Report und genau ein isolierter Prototypordner geschrieben.
Morning decision: BEHALTEN
Next recommendation: Den Proof-Kiosk nur als 5-Minuten-Hilfsmittel nutzen, um eine echte Proof-Ledger-Zeile zu einem vorhandenen Night-App-Prototyp zu erzeugen. Danach darf Night App Studio wieder gezielt verbessern oder bewusst wegwerfen; ohne Real-Entry keine V2.

## Befehlskarte
- Open/Test-Befehl: `open /Users/zondrius/hermes-workspace/projects/night-lab/2026-06-14-proof-kiosk-night-app/index.html` ausfuehren; dann eine Testkarte waehlen, den angezeigten `open ...`-Befehl fuer den vorhandenen Prototyp nutzen, Status setzen und die Ledger-Zeile ansehen.
- Chris 5-Minuten-Befehl: Oeffne den Proof-Kiosk, pruefe genau einen vorhandenen Night-App-Prototyp 60 Sekunden lang und kopiere nur dann eine anonyme Zeile unter `## Real Entries` in `/Users/zondrius/hermes-workspace/inbox/chris-feedback/proof-ledger.md`.
- Proof-Befehl: Wenn kein echter Sichttest stattfindet, Status `parked` oder gar keine Real-Entry-Zeile setzen; nicht `tested_useful` erfinden.
- V2-Codex-Befehl: keiner
- Hermes-Pruefbefehl: Morgen pruefen, ob unter `## Real Entries` eine neue echte Night-App-Zeile steht; wenn ja, die naechste App-Entscheidung daran ausrichten, wenn nein, keine V2/Expansion starten.
- Stop-/Park-Befehl: Proof-Kiosk-Familie stoppen, wenn Chris die Ledger-Zeile auch ohne App schneller manuell setzen kann oder wenn der Kiosk nur zusaetzliche Bedienung erzeugt.
- Nicht-ausfuehren: Kein automatisches Schreiben ins Proof-Ledger, kein Fuenferfeld/Five-frame, keine sensiblen Daten, keine externen Dienste, keine Accounts, keine Installs, keine Commits, keine Pushes, kein Deploy, kein Umbau bestehender Apps.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: Proof-Kiosk einmal oeffnen und genau einen vorhandenen Night-App-Prototyp 60 Sekunden testen.
- CHRIS_ENTSCHEIDET: Ob die daraus entstehende Proof-Zeile `tested_useful`, `tested_not_useful` oder `parked` lautet.
- BEOBACHTEN: Ob ein kleiner Cockpit-Slice die Proof-Disziplin wirklich erleichtert oder nur ein weiteres Tool wird.
- SPAETER: Nach echtem `tested_useful` gezielt eine einzige V2 der bewiesenen App-Familie planen.
- BLOCKIERT: V2, Produktisierung und weitere Expansion ohne echte Proof-Ledger-Zeile.
- NICHT_TUN: Keine Fuenferfeld-/Five-frame-Rueckkehr, keine neuen ungetesteten GE-Spielraum-/Materialkorb-/Vertretungs-Klone, kein Handoff/Deploy/Commit/Push/Install, keine sensiblen Daten.
- Naechste kleinste Aktion: `open /Users/zondrius/hermes-workspace/projects/night-lab/2026-06-14-proof-kiosk-night-app/index.html`
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/night-app-studio/night-app-studio-2026-06-14.md`
