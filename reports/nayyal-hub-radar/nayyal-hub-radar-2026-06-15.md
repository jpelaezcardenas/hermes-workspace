# Nayyal Hub Radar - 2026-06-15

## Kurzfazit
Yellow. Die oeffentliche Seite ist erreichbar, bleibt aber im Kern ein privates Nayyal-Nexus-Gate; das ist sicher, aber noch nicht orientierend. Lokal ist die Stocks-Route-Map inzwischen deutlich besser strukturiert als die Hub-Erklaerung. Der beste naechste Hebel ist deshalb kein Deploy und keine neue Produktseite, sondern eine lokale Connector-Registry-/Route-Inventory-Struktur, die Public, Research und Private sauber verbindet.

## Best Next Nayyal Move
- Do: Eine lokale `Nayyal Connector Registry` als Strukturentscheidung vorbereiten: jede Route oder Projektkachel bekommt `visibility`, `purpose`, `guardrail`, `proof_status` und `next_action`. Companion-Artefakt: `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-15.md`.
- Why: Die Public/Research/Private-Grenze wurde mehrfach erkannt; jetzt braucht sie eine kleine umsetzbare Struktur, damit Hub, Subpages und private Grenzen nicht nur als Text im Report stehen.
- Source: Public Check `https://www.nayyal.com/` Status 200, Titel `Nayyal Nexus`, sichtbarer Login-/Privattext; lokale Quellen `src/nayyalSiteStructure.ts`, `src/nayyalSiteStructure.test.ts`, `dist/index.html`; Proof Ledger ohne Real Entries.
- Not now: Kein Live-Deploy, kein Login, keine Portfolio-/Broker-/Cash-/Orderdaten, keine Schul- oder Personendaten, keine Finanzberatung, keine Fuenferfeld-Richtung.

## Site / Hub Reading
- Public site: Geprueft. `https://www.nayyal.com/` antwortet mit Status 200 und zeigt `Nayyal Nexus`, `Privater Zugang zu deinem persoenlichen Cockpit`, Passwortfeld und Hinweis `Alle bestehenden Projektlinks bleiben separat erreichbar.` Kein Login, kein Formular, kein Scraping privater Daten.
- Local route map: `src/nayyalSiteStructure.ts` definiert 18 Stocks-Routen mit Privacy-Typen `private`, `research-shareable`, `mixed`, Zweck und Guardrail. Tests pruefen u.a. private Portfolio-/Expenses-Trennung und Guardrails.
- Confirmed subpages: `/`, `/portfolio`, `/research`, `/inbox`, `/decision`, `/confluence`, `/options`, `/x-traffic`, `/crowd`, `/shockboard`, `/early-warning`, `/signals`, `/ai-chain`, `/penny-finder`, `/government`, `/materials`, `/robotics`, `/expenses`.
- Private or guarded areas: `/portfolio` und `/expenses` sind private; `/` und `/research` sind mixed; alle Finance-/Stocks-Seiten nur als Research oder Private behandeln, nie als Trading- oder Beratungsflaeche.
- Missing/unclear areas: Eine zentrale Hub-Registry fehlt: Welche Projektfenster sind public, welche research-shareable, welche privat, welcher Proof-Status gilt, und welche naechste sichere Aktion ist erlaubt?

## Five Improvement Candidates

### 1. Nexus-Gate mit einem Satz Orientierung
- Title: Das Gate sagt, was Nayyal ist, ohne Inhalte zu oeffnen
- Area: Homepage/hub clarity
- Why it matters: Besucher verstehen aktuell nur `privater Zugang`, aber nicht, ob Nayyal Bildungswerkstatt, AI-System, Research-Hub oder persoenliches Cockpit ist.
- Source anchor: Public Site `Nayyal Nexus`, `Privater Zugang zu deinem persoenlichen Cockpit`.
- Proposed change: Eine sichere Microcopy lokal vorbereiten: `Nayyal ist ein geschuetzter Hub fuer Werkstattfenster, Research-Demos und private Cockpits. Private Schul- und Finanzdaten bleiben geschlossen.`
- Risk / privacy note: Nicht einsetzen, wenn Chris die Startseite komplett still halten will; keine Schueler-, Finanz- oder Accountdetails.
- Effort: 20 min
- Substance score /10: 7
- Safe for Codex: yes, als lokaler Copy-Entwurf; Live-Deploy nein
- Kill condition: Chris entscheidet, dass Nayyal.com keinerlei oeffentliche Erklaerung zeigen soll.

### 2. Route-Inventory aus `stocksNayyalRoutes`
- Title: Research-Routen sichtbar ordnen, private Routen hart abgrenzen
- Area: Subpage/navigation
- Why it matters: Die Route-Map ist stark, aber ohne Hub-Inventory bleiben Routen wie `/decision`, `/options`, `/government` und `/portfolio` fuer Navigation und Sichtbarkeit schwer einzuordnen.
- Source anchor: `src/nayyalSiteStructure.ts` und `src/nayyalSiteStructure.test.ts`.
- Proposed change: Lokale Tabelle: Route, Label, Bereich, Sichtbarkeit, Guardrail, `show_in_public_hub: false|maybe|yes`, `proof_status`.
- Risk / privacy note: `/portfolio` und `/expenses` duerfen nur als private Platzhalter auftauchen, nie mit Inhalt; Finance Research ohne Buy/Sell/Hold-Sprache.
- Effort: 1 hour
- Substance score /10: 9
- Safe for Codex: yes
- Kill condition: Wenn Nayyal-Hub vorerst gar keine Subpage-Verknuepfung erhalten soll.

### 3. Trust- und Guardrail-Zeile je Connector
- Title: Jede Kachel bekommt ihren Datenschutzsatz
- Area: Trust/privacy/guardrail
- Why it matters: Nayyal verbindet Schule, AI, Research und Finanzen; ohne sichtbare Grenzen kann Vertrauen verloren gehen oder versehentlich Privates als Demo wirken.
- Source anchor: Guardrails in `stocksNayyalRoutes`; Schulwerkstatt-Cockpit-Report mit Connector-Zentrale.
- Proposed change: Fuer jede Hub-Kachel ein Feld `trust_rule`, z.B. `Keine echten Schuelerdaten`, `Research ist keine Anlageberatung`, `Privat bleibt hinter Gate`.
- Risk / privacy note: Besonders wichtig fuer Schul- und Finance-Kontexte; keine realen Beispiele mit Personenbezug.
- Effort: 20 min
- Substance score /10: 8
- Safe for Codex: yes, lokal
- Kill condition: Wenn Kacheln noch nicht als Hub-Struktur feststehen.

### 4. Positionierung: Nayyal als kuratierter Studio-Hub statt Produkt-Shop
- Title: Von Verkaufsseite zu sicherem Studio-Nexus
- Area: Product/story/positioning
- Why it matters: Die staerkste Story ist nicht ein einzelnes Produkt, sondern Chris' System aus Bildungswerkzeugen, Hermes OS, Vereins-/Sportideen und Research-Cockpits mit klaren Grenzen.
- Source anchor: Schulwerkstatt-Cockpit-Report, TSV-Playbook-Dateien, Business-Ideen- und Night-App-Studio-Reports.
- Proposed change: Interne Leitformel: `Nayyal ist ein geschuetzter Studio-Hub: oeffentliche Werkstattfenster, teilbare Research-Methoden, private Cockpits.`
- Risk / privacy note: Zu breite Story kann diffus werden; keine Produktisierung ohne Proof und keine sensiblen Kontexte als Marketingbeleg.
- Effort: 20 min
- Substance score /10: 7
- Safe for Codex: no, zuerst Chris-Positionierung
- Kill condition: Wenn Chris Nayyal kurzfristig nur als privates Cockpit nutzen will.

### 5. Hermes Proof Board fuer Nayyal
- Title: Proof-Status in die Hub-Logik einbauen
- Area: Meta-system
- Why it matters: Das Proof Ledger hat noch keine Real Entries; ohne Proof sollte Nayyal keine V2-, Produkt- oder Demo-Expansion behaupten.
- Source anchor: `/Users/zondrius/hermes-workspace/inbox/chris-feedback/proof-ledger.md` ohne reale Eintraege unter `Real Entries`.
- Proposed change: Connector-Registry ergaenzt `proof_status: untested | tested_useful | tested_not_useful | parked` und zeigt nur `tested_useful` als starke oeffentliche Demo-Kandidaten.
- Risk / privacy note: Proof darf keine echten Schueler-, Finanz- oder privaten Accountdaten enthalten; ungetestete Dinge nicht als Wirkung verkaufen.
- Effort: 1 hour
- Substance score /10: 9
- Safe for Codex: yes
- Kill condition: Wenn Proof-Tracking bewusst ausserhalb von Nayyal bleiben soll.

## Meta-Ebene: Was Hermes mit der Hub-Seite noch besser machen koennte
- Eine Safe Connector Registry pflegen: Projekt, Zielroute, Sichtbarkeit, Guardrail, Proof-Status, letzte Pruefung.
- Ein Route Inventory aus Code und Reports automatisch in einen lokalen Hub-Plan spiegeln, ohne live zu deployen.
- Ein Product Proof Board fuehren: Nur getestete, sichere Artefakte duerfen als Demo-Kandidaten markiert werden.
- Eine Public/Research/Private-Map als feste Pruefschicht vor jedem neuen Nayyal-Link nutzen.
- Eine woechentliche Hub-Substanzpruefung laufen lassen: `Was ist noch nur Idee, was ist getestet, was darf sichtbar werden?`

## Codex-Ready Slice
- Type: CODEX_HANDOFF_READY
- Safe for Codex: yes
- Mini execute prompt: /goal In `/Users/zondrius/Documents/New project`, create a local-only Nayyal connector registry draft without deploying. Add a small TypeScript module or markdown artifact that lists confirmed `stocksNayyalRoutes` with fields `path`, `label`, `visibility`, `purpose`, `guardrail`, `proof_status`, and `next_action`. Keep `/portfolio` and `/expenses` private placeholders only. Do not use secrets, do not log in, do not deploy, do not edit public copy. Add or update a test that verifies every registry entry has visibility, guardrail, and proof_status, and that private routes are not marked public. Run the relevant test command and write a short local report with changed files and test result.
- Why: Das ist ein klarer lokaler Struktur-Slice mit hohem Orientierungswert und ohne Live-Risiko.
- Handoff risk: Niedrig, solange es lokal bleibt; Risiko steigt erst bei Deploy, echter Public-Copy oder privaten Daten.

## Befehlskarte
- Chris 5-Minuten-Befehl: Entscheide fuer die Zielstruktur `Nayyal Connector Registry`: Darf Hermes/Codex lokal eine Registry mit `visibility`, `guardrail` und `proof_status` fuer die bestehenden Routen vorbereiten? Ziel: `/Users/zondrius/Documents/New project` und Reportordner `nayyal-hub-radar`.
- Codex-Befehl: /goal In `/Users/zondrius/Documents/New project`, create a local-only Nayyal connector registry draft without deploying. Add a small TypeScript module or markdown artifact that lists confirmed `stocksNayyalRoutes` with fields `path`, `label`, `visibility`, `purpose`, `guardrail`, `proof_status`, and `next_action`. Keep `/portfolio` and `/expenses` private placeholders only. Do not use secrets, do not log in, do not deploy, do not edit public copy. Add or update a test that verifies every registry entry has visibility, guardrail, and proof_status, and that private routes are not marked public. Run the relevant test command and write a short local report with changed files and test result.
- Hermes-Pruefbefehl: Morgen pruefen, ob ein Registry-Entwurf existiert oder ob Chris den Slice geparkt hat; keine neue Public-Copy vorschlagen, bevor die Registry-Grenzen geklaert sind.
- Proof-Befehl: Eine echte Nutzung erst zaehlen, wenn Chris die Registry oder Map einmal als Orientierung verwendet und im Proof Ledger mit `tested_useful`, `tested_not_useful` oder `parked` eintraegt.
- Stop-/Park-Befehl: Stoppen, wenn Chris Nayyal.com weiterhin als reines stilles Privat-Gate ohne Public-/Research-Fenster fuehren will oder wenn private Finanz-/Schuldaten fuer die Hub-Logik noetig waeren.
- Nicht-ausfuehren: Keine Deploys, Logins, Formularaktionen, privaten Daten, Finance-private Exposure, Kauf-/Verkauf-/Hold-Sprache, externen Sends, Commits, Pushes, Provider-Setups oder Fuenferfeld-Richtung.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: Codex-ready lokalen Registry-Slice nur nach Chris' Freigabe ausfuehren; bis dahin keine Live-Aktion.
- CHRIS_ENTSCHEIDET: Ob die `Nayyal Connector Registry` lokal angelegt werden soll und ob Nayyal.com spaeter eine kurze Public-Orientierung zeigen darf.
- BEOBACHTEN: Proof Ledger bleibt ohne Real Entries; keine Produkt-/Demo-Expansion ohne Testbeleg.
- SPAETER: Safe Connector Registry, Proof Board und Demo-Katalog koennen nach lokaler Registry als naechste Strukturstufe folgen.
- BLOCKIERT: Keine echte oeffentliche Hub-Verbesserung ohne Chris' Sichtbarkeitsentscheidung.
- NICHT_TUN: Kein Deploy, kein Login, keine privaten Finanz-/Schuldaten, keine Trading-Sprache, keine Fuenferfeld-Richtung.
- Naechste kleinste Aktion: Chris entscheidet ja/nein zur lokalen Connector-Registry; bei ja kann der Codex-Befehl aus der Befehlskarte genutzt werden.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-hub-radar-2026-06-15.md` und `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-15.md`
