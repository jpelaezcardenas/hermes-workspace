# Nayyal Hub Radar - 2026-06-16

## Kurzfazit
Yellow. Die oeffentliche Startseite ist erreichbar, zeigt aber aktuell nur ein Passwort-Gate mit "Nayyal Nexus" und erklaert die Welt dahinter nicht. Lokal gibt es bereits eine starke Route Map fuer stocks.nayyal.com mit Privacy-Guardrails; der groesste Hebel ist jetzt nicht mehr mehr Inhalt, sondern eine klare Public/Research/Private-Orientierung.

## Best Next Nayyal Move
- Do: Die Public/Research/Private-Grenze als kleine Orientierungsschicht fuer Nayyal festlegen und daraus spaeter eine kurze Startseiten-Sektion ableiten.
- Why: Besucher sehen aktuell nur ein Gate; Chris braucht aber einen Hub, der Vertrauen schafft, ohne private Bereiche offenzulegen.
- Source: Public site Check vom 2026-06-16: www.nayyal.com liefert "Nayyal Nexus" mit Passwortfeld. Lokale Route Map: `/Users/zondrius/Documents/New project/src/nayyalSiteStructure.ts` trennt private Routen `/portfolio`, `/expenses` von research-shareable Routen.
- Not now: Kein Deploy, keine Login-Pruefung, keine Finanzdaten, keine echten Schul-/Personendaten, keine Erweiterung Richtung Fuenferfeld.

## Site / Hub Reading
- Public site: geprueft. `https://www.nayyal.com/` ist erreichbar und zeigt ein minimalistisches Gate: "Nayyal Nexus", Passwortfeld, Button "Oeffnen". Keine Login-Nutzung, keine Formulareingabe.
- Local route map: geprueft. `nayyalSiteStructure.ts` definiert stocks-Routen mit `privacy` und `dataGuardrail`; Tests sichern Kernrouten und Portfolio-/Expense-Privatheit ab.
- Confirmed subpages: stocks command center `/`, `/portfolio`, `/research`, `/inbox`, `/decision`, `/confluence`, `/options`, `/x-traffic`, `/crowd`, `/shockboard`, `/early-warning`, `/signals`, `/ai-chain`, `/penny-finder`, `/government`, `/materials`, `/robotics`, `/expenses`.
- Private or guarded areas: `/portfolio`, `/expenses`, passwortgeschuetztes Nayyal Nexus, Hermes-Control-Reports, Decision Inbox, private App-/Research-Arbeitsberichte. Finance/Stocks nur als Research-/Privatbereich, nicht als Anlageberatung.
- Missing/unclear areas: Eine oeffentliche Erklaerung "Was ist Nayyal?" fehlt sichtbar. Ebenfalls unklar: Welche Produktwelten oeffentlich gezeigt werden sollen (Schulwerkstatt/LeseWerk/GE-Tools, Wahren Playbook, Hermes OS, AI Studio) und welche nur intern bleiben.

## Five Improvement Candidates

### 1. Drei-Zonen-Hinweis auf der Hub-Startseite
- Title: "Public / Research / Private" als erstes Orientierungssignal
- Area: Homepage / Hub clarity
- Why it matters: Das Passwort-Gate wirkt sicher, aber ohne Kontext auch verschlossen. Eine kurze, nicht-sensitive Einordnung kann Vertrauen schaffen, ohne private Inhalte preiszugeben.
- Source anchor: Browser-Check `https://www.nayyal.com/`: nur "Nayyal Nexus" + Passwortfeld sichtbar.
- Proposed change: Unter oder vor dem Gate eine knappe Copy: "Nayyal buendelt oeffentliche Demos, research-shareable Experimente und private Arbeitsbereiche. Private Daten bleiben hinter geschuetzten Grenzen." Dazu drei kleine Karten: Public, Research, Private.
- Risk / privacy note: Darf keine privaten Pfade, Depot-/Broker-/Schuldaten oder interne Reports nennen.
- Effort: 1 hour
- Substance score /10: 9
- Safe for Codex: yes, wenn nur lokal vorbereitet und nicht deployed wird
- Kill condition: Wenn Chris Nayyal bewusst als vollstaendig geschlossenes Private-Gate ohne oeffentliche Erklaerung halten will.

### 2. Route-Inventar mit Audience-Spalte
- Title: Stocks Route Map um Zielgruppe/Zone ergaenzen
- Area: Subpage / Navigation
- Why it matters: Die Route Map hat bereits Privacy und Guardrails; fuer Hub-Routing fehlt noch, ob eine Route fuer Public, Research oder Private gedacht ist und fuer wen sie lesbar ist.
- Source anchor: `src/nayyalSiteStructure.ts`, Tests in `src/nayyalSiteStructure.test.ts`.
- Proposed change: Lokale Strukturentscheidung vorbereiten: pro Route eine optionale `audience` oder `zone`-Beschreibung, z.B. `private-self`, `research-shareable`, `public-summary-only`. Noch keine Live-Aenderung.
- Risk / privacy note: Gefahr: Research-Routen koennten versehentlich als oeffentlich missverstanden werden. Daher nur als lokale Strukturpruefung.
- Effort: 1 hour
- Substance score /10: 8
- Safe for Codex: yes
- Kill condition: Wenn das stocks-Projekt bewusst nur intern bleiben und keine Hub-Navigation speisen soll.

### 3. Finance-Guardrail sichtbar, aber nicht detailreich
- Title: Finanzbereiche als Research/Private kennzeichnen
- Area: Trust / Privacy / Guardrail
- Why it matters: Nayyal enthaelt finance/stock-nahe Bereiche. Oeffentlich muss klar sein: keine Anlageberatung, keine Orders, keine Portfolio-Offenlegung.
- Source anchor: `dataGuardrail`-Texte in `nayyalSiteStructure.ts`, z.B. Portfolio private, Research scores not buy orders, Options fit never recommends or executes a trade.
- Proposed change: Eine wiederverwendbare Trust-Formulierung fuer alle finance-nahen Hub-Verweise: "Research ist Pruefung, keine Empfehlung; private Portfolio- und Kontodaten bleiben verborgen."
- Risk / privacy note: Niemals buy/sell/hold-Sprache, keine Broker-, Cash-, Order- oder Holdings-Details.
- Effort: 20 min
- Substance score /10: 9
- Safe for Codex: yes, fuer lokale Copy-Datei oder Komponentenentwurf; nein fuer Live-Publish ohne Review
- Kill condition: Wenn Finance-Bereiche komplett aus der oeffentlichen Hub-Erzaehlung entfernt werden sollen.

### 4. Produktstory: Nayyal als kuratierter Studio-Hub statt Einzelprodukt
- Title: "Studio Hub" mit sicheren Produktwelten
- Area: Product / Story / Positioning
- Why it matters: Die staerksten Welten sind nicht nur eine Homepage: Schulwerkstatt/LeseWerk/GE-Tools, Wahren Playbook, Hermes OS und AI-Systeme. Als Studio-Hub kann Nayyal Orientierung geben, ohne alles zu verkaufen.
- Source anchor: Lokale Reportlandschaft: Schulwerkstatt-Reports, TSV-Playbook-Projekt, Night-App-Studio, Business-Ideen, VdS-GE-Monitor.
- Proposed change: Positionierung: "Nayyal ist Chris' Studio fuer sichere Bildungs-, Vereins- und AI-Systeme." Darunter nur gepruefte, datensparsame Kacheln; private/research-only Dinge bleiben markiert.
- Risk / privacy note: Nicht zu breit werden; keine VdS-Interna, keine Schuelerdaten, keine unfertigen Apps als fertige Produkte darstellen.
- Effort: later
- Substance score /10: 7
- Safe for Codex: no, zuerst Positionierungsentscheidung durch Chris
- Kill condition: Wenn Nayyal kurzfristig nur stocks/private command center sein soll.

### 5. Nayyal Connector Registry
- Title: Sicheres Verzeichnis: Welche Reports duerfen welche Hub-Seite speisen?
- Area: Meta-system Hermes + Nayyal
- Why it matters: Hermes produziert viele Reports. Ohne Registry droht die Hub-Seite entweder zu leer zu bleiben oder private/research-only Inhalte versehentlich oeffentlich zu machen.
- Source anchor: Reportordner `hermes-control`, `decision-inbox`, `night-app-studio`, `business-ideas`, `vds-ge`, `projects/hermes-schulwerkstatt`, `tsv-playbook-analyse`.
- Proposed change: Eine lokale `connector registry` als Markdown oder JSON: Quelle, Zielzone, erlaubter Inhalt, verbotener Inhalt, Review-Pflicht, naechster sicherer Link.
- Risk / privacy note: Registry darf keine sensiblen Inhalte selbst kopieren, nur Kategorien und Regeln.
- Effort: 1 hour
- Substance score /10: 8
- Safe for Codex: yes, wenn lokal und ohne Deploy
- Kill condition: Wenn keine automatische oder halbautomatische Hub-Speisung geplant ist.

## Meta-Ebene: Was Hermes mit der Hub-Seite noch besser machen koennte
1. Safe Connector Registry: jede Reportquelle bekommt eine Zone, eine Freigaberegel und eine harte Verbotsliste.
2. Product Proof Board: Nur Dinge mit `tested_useful` oder klarer Demo-Proof-Stufe duerfen als staerkeres Produkt-Signal auf den Hub.
3. Public/Research/Private Map: Die heute erstellte Karte wird als Governance-Artefakt gepflegt, bevor neue Subpages sichtbar werden.
4. Demo Catalog: Kleine, sichere Demo-Kacheln mit Status: prototype, internal, public-safe, parked.
5. Weekly Hub Substance Review: Hermes prueft woechentlich, ob die Hub-Startseite Orientierung, Vertrauen und naechste Schritte verbessert oder nur neue Kacheln sammelt.

## Codex-Ready Slice
- Type: HUMAN_REVIEW_FIRST
- Safe for Codex: no
- Mini execute prompt: keiner
- Why: Es gibt zwar sichere lokale Codex-Kandidaten (Route-Inventar, Guardrail-Copy, Connector Registry), aber der heutige Gewinner ist eine Struktur-/Grenzentscheidung: Wie sichtbar soll Nayyal als Public/Research/Private-Hub sein? Das sollte Chris zuerst bestaetigen.
- Handoff risk: Ohne menschliche Richtung koennte Codex eine oeffentliche Erklaerung vorbereiten, die Chris' gewollte Privatheit oder Positionierung falsch trifft.

## Befehlskarte
- Chris 5-Minuten-Befehl: Lies `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-16.md` und markiere eine Zeile: "Public erklaeren: ja/nein".
- Codex-Befehl: keiner
- Hermes-Pruefbefehl: Morgen pruefen, ob Chris Public/Research/Private als Nayyal-Grenzmodell akzeptiert hat; falls ja, eine lokale Startseiten-Copy-Sektion als Codex-ready Slice formulieren, nicht deployen.
- Proof-Befehl: 60-Sekunden-Sichttest mit einer neutralen Person oder mit Chris selbst: Versteht man nach der Drei-Zonen-Copy, was sichtbar ist und was privat bleibt? Status danach im Proof Ledger nur anonym und ohne private Details eintragen.
- Stop-/Park-Befehl: Richtung parken, wenn Chris Nayyal weiterhin als reines Passwort-Gate ohne Public-Erklaerung will.
- Nicht-ausfuehren: keine Deploys, keine Logins, keine Passwortversuche, keine privaten Finanz-/Portfolio-/Broker-/Ausgabendaten, keine Schul- oder Personendaten, keine externen Sends, kein Fuenferfeld.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Soll Nayyal oeffentlich als Drei-Zonen-Hub erklaert werden: Public / Research / Private?
- BEOBACHTEN: Stocks Route Map ist bereits guardrail-stark; naechster Wert entsteht durch Audience-/Zone-Klarheit, nicht durch mehr Finanzfunktionen.
- SPAETER: Sichere lokale Codex-Slices fuer Route-Inventar, Finance-Guardrail-Copy oder Connector Registry vorbereiten, sobald Chris die Hub-Grenze bestaetigt.
- BLOCKIERT: Live-Startseitenverbesserung ist blockiert bis zur Positionierungsentscheidung; kein technischer Blocker fuer lokale Vorbereitung.
- NICHT_TUN: Kein Deploy, keine Login-/Passwortaktionen, keine Finance-private Exposure, keine echten Schul-/Personendaten, keine Fuenferfeld-Richtung.
- Naechste kleinste Aktion: Chris entscheidet anhand der Companion Map, ob die Drei-Zonen-Erklaerung auf Nayyal sichtbar werden soll.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-hub-radar-2026-06-16.md`; Companion: `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-16.md`
