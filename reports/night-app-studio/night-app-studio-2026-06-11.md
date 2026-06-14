# Night App Studio - 2026-06-11
Status: GEBAUT
Mode: BUILD_NEW
App des Morgens: Fuell-Leer-Spielraum GE
Why selected: Aus maximal 5 Kandidaten wurde bewusst keine V2 und kein weiterer Vertretungs-/S-Kisten-/Materialkorb-Klon gewählt, weil kein echtes Chris-Feedback und kein Proof-Ledger-Eintrag eine Erweiterung rechtfertigen. Die beste sichere neue Spur ist ein GE-Spielraum-Slice zur aktuellen Teacher-Nextday-Idee `Mengen fuellen und leeren`: sichtbar, lokal, ohne Namen/Diagnosen, in 60 Sekunden prüfbar und klar verschieden von den letzten App-Familien. Kandidaten kurz: 1) Hermes Morning Cockpit Slice 7/10, nuetzlich aber Control/Decision-Inbox-nah und heute weniger unterrichtsnah; 2) GE-Spielraum Fuell-Leer 9/10 vor Caps; 3) Materialkorb-Kartenmacher V2 gebremst, ungetestet; 4) Vertretungsstunden V2 gebremst, ungetestet; 5) Morgenkarten-/Fuenferfeld-nahe Varianten verworfen, Fuenferfeld geparkt.
Recent repeat check: Letzte 3 Reports gelesen: 2026-06-10 Vertretungsstunden-Assistent GE, 2026-06-09 S-Kisten-Starter, 2026-06-08 Materialkorb-Kartenmacher. Keine Wiederholung dieser Familien. Feedback-Log enthält keine echte Nutzung. Proof-Ledger enthält nur Beispielzeilen, kein getesteter Night-App-Proof. Deshalb kein V2, keine Expansion und keine Produktisierung.
Score before caps: 9/10
Score caps applied: Keine Cap angewendet. Screenshot/visuelle Prüfung vorhanden; die App ist nicht nur ein Formular oder reiner Textgenerator, sondern eine sichtbare Mini-Interaktion mit Schale, Becher, Teilen, Aktionsbuttons und Abschlusszustand; ein vollständiger 60-Sekunden-Flow wurde lokal geklickt; keine Duplikation einer bestehenden App-Familie. Datenschutz/Kosten sind Hard Gates und bestanden.
Final score: 9/10
Proof:
- Screenshot: /Users/zondrius/.hermes/profiles/neva/cache/screenshots/browser_screenshot_a9ae5be50f994a39986c121e8a396bb7.png
- 60-second flow: `open /Users/zondrius/hermes-workspace/projects/night-lab/2026-06-11-fuell-leer-spielraum/index.html`, dann `Fuellen` klicken, `Leeren` klicken, `Fertig` klicken; geprüft im Browser.
- App feeling: Kleine sichtbare Lernraum-Simulation statt Textformular: Schale/Becher/Teile verändern sich, UK-Karten und Beobachtungszettel bleiben neben der Handlung sichtbar.
What exists: Lokaler isolierter Prototyp mit `index.html` und `README.md` unter `/Users/zondrius/hermes-workspace/projects/night-lab/2026-06-11-fuell-leer-spielraum/`.
How to open/test: Im Terminal ausführen: `open /Users/zondrius/hermes-workspace/projects/night-lab/2026-06-11-fuell-leer-spielraum/index.html`. Danach in unter 60 Sekunden nacheinander `Fuellen`, `Leeren`, `Fertig` klicken und prüfen, ob Handlung und Stop-Regel ohne Erklärung verständlich sind.
Risks: Der Prototyp darf echte Tischhandlung nicht ersetzen. Er hat noch keinen Realwelt-Proof und darf nicht als wirksam behauptet werden. Keine Schülernamen, Diagnosen, Fotos, individuellen Förderdaten oder Klassenfälle eintragen; die App speichert nichts und fragt nichts ab.
Cost/Scope Guard: Kein Install, kein npm/pip, keine externen APIs, keine Accounts, kein Scraping, kein Deploy, kein Commit, kein Push, keine Edits an bestehenden Apps, `src/**`, Hermes-Config, Handoff-Dateien, Cron-Dateien, Nayyal, GE-Lernwerkstatt oder LeseWerk.
Morning decision: BEHALTEN
Next recommendation: Nur als 60-Sekunden-Sichttest behalten. Keine V2, bis Chris oder eine erwachsene Testperson bestätigt, ob die sichtbare Fuell-/Leer-Logik schneller verständlich ist als die Teacher-Nextday-Textkarte.

## Befehlskarte
- Open/Test-Befehl: `open /Users/zondrius/hermes-workspace/projects/night-lab/2026-06-11-fuell-leer-spielraum/index.html` ausführen; dann `Fuellen`, `Leeren`, `Fertig` klicken und prüfen, ob der Ablauf in 60 Sekunden ohne Erklärung verstanden wird.
- Chris 5-Minuten-Befehl: Öffne den Prototyp nur kurz und entscheide: Hilft die sichtbare Schale-Becher-Handlung beim Denken über den echten Tischaufbau, ja/nein?
- V2-Codex-Befehl: keiner
- Hermes-Pruefbefehl: Morgen nur prüfen, ob ein echter Sichttest/Proof im Feedback-Log oder Proof-Ledger steht; ohne Proof keine V2, kein Handoff, keine Produktisierung.
- Proof-Befehl: Nach echtem Test optional datensparsam eintragen: `2026-06-11 | Night App | Fuell-Leer-Spielraum GE | tested_useful/tested_not_useful/parked | kurze Notiz ohne Personendaten | behalten/wegwerfen`.
- Stop-/Park-Befehl: Stoppen, wenn die App gegenüber echter Tischvorbereitung keinen Zusatznutzen hat oder weitere Varianten nur Materiallisten statt besserer Handlung erzeugen.
- Nicht-ausfuehren: Kein Fuenferfeld, keine echten Namen, keine Diagnosen, keine Lernendenprofile, keine Fotos, keine externe Speicherung, keine Konten, keine APIs, kein Deploy, kein Commit, kein Push, kein Umbau der GE-Lernwerkstatt oder von LeseWerk.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: Den lokalen Prototyp einmal in 60 Sekunden öffnen und `Fuellen → Leeren → Fertig` klicken.
- CHRIS_ENTSCHEIDET: Ob diese GE-Spielraum-Linie nach echtem Sichttest weiter verfolgt oder sofort geparkt wird.
- BEOBACHTEN: Ob sichtbare Mini-Interaktionen stärker helfen als weitere Text-/Karten-Generatoren.
- SPAETER: Eine V2 mit besserem Druck-/Tischkartenbezug erst nach `tested_useful`-Proof.
- BLOCKIERT: Produktisierung, Handoff und V2 sind ohne echten Proof blockiert; der lokale Sichttest ist nicht blockiert.
- NICHT_TUN: Keine Fuenferfeld-Reaktivierung, keine Vertretungs-/S-Kisten-/Materialkorb-V2 ohne Feedback, keine sensiblen Daten, keine externen Dienste, keine Deploys, keine Commits/Pushes.
- Naechste kleinste Aktion: `open /Users/zondrius/hermes-workspace/projects/night-lab/2026-06-11-fuell-leer-spielraum/index.html`
- Beleg / Datei: /Users/zondrius/hermes-workspace/reports/night-app-studio/night-app-studio-2026-06-11.md
