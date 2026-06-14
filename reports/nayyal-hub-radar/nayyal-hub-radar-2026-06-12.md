# Nayyal Hub Radar - 2026-06-12

## Kurzfazit
Yellow. Nayyal.com ist oeffentlich erreichbar, zeigt aber aktuell vor allem einen privaten Passwort-Nexus statt eine erklaerende Hub-Seite. Die lokale Route-Map fuer `stocks.nayyal.com` ist dagegen deutlich strukturierter und hat schon gute Guardrails. Der beste naechste Schritt ist keine neue Seite, sondern eine klare Public/Research/Private-Grenzkarte als Entscheidungsgrundlage.

## Best Next Nayyal Move
- Do: Die Public/Research/Private-Grenze fuer Nayyal als konkrete Map festziehen und als Referenz fuer Hub, Navigation und Connectoren nutzen.
- Why: Ohne diese Grenze vermischen sich oeffentliche Orientierung, teilbare Research-Bereiche und private Cockpits zu schnell; das ist besonders riskant bei Schule und Finanzen.
- Source: Public Check `https://www.nayyal.com/` zeigt passwortgeschuetzten `Nayyal Nexus`; lokale `nayyalSiteStructure.ts` trennt bereits `private`, `mixed` und `research-shareable`; Proof-Ledger hat noch keine echten Real-Entries.
- Not now: Kein Live-Deploy, keine Passwort-/Login-Aktion, keine Portfolio-/Broker-/Cash-Offenlegung, keine Schul- oder Personendaten, keine Fuenferfeld-Richtung.

## Site / Hub Reading
- Public site: Geprueft am 2026-06-12. `https://www.nayyal.com/` antwortet mit Status 200 und zeigt einen Passwortzugang `Nayyal Nexus`, Text: `Privater Zugang zu deinem persoenlichen Cockpit.` Plus Hinweis: `Alle bestehenden Projektlinks bleiben separat erreichbar.` Keine Anmeldung versucht.
- Local route map: `/Users/zondrius/Documents/New project/src/nayyalSiteStructure.ts` definiert `stocksNayyalRoutes` mit Privacy-Typen `private`, `research-shareable`, `mixed` und Guardrails. Tests in `nayyalSiteStructure.test.ts` pruefen private Portfolio-/Expenses-Trennung und Guardrails.
- Confirmed subpages: Stocks-Research-Routen: `/`, `/portfolio`, `/research`, `/inbox`, `/decision`, `/confluence`, `/options`, `/x-traffic`, `/crowd`, `/shockboard`, `/early-warning`, `/signals`, `/ai-chain`, `/penny-finder`, `/government`, `/materials`, `/robotics`, `/expenses`. Schulwerkstatt-Cockpit-Report bestaetigt lokale App-Kacheln LeseWerk, Lernwerkstatt, Spielraum, Foerderkompass, Aufgabenbank, Wochenplan, Nayyal-Welten.
- Private or guarded areas: Nayyal Nexus selbst; Portfolio; Expenses; private Schulwerkstatt-Connectoren; echte Schul-, Personen-, Finanz- und Brokerdaten. Finance-Seiten nur als private/research guardrail behandeln, nicht als Trading- oder Beratungsseite.
- Missing/unclear areas: Es fehlt eine oeffentliche, nicht-login-pflichtige Erklaerkarte: Was ist Nayyal? Welche Teile sind public, research, private? Welche Projektfenster darf ein neugieriger Besucher sehen? Welche Links bleiben bewusst verborgen?

## Five Improvement Candidates

### 1. Hub-Startkarte: `Was ist Nayyal?`
- Title: Eine oeffentliche 3-Satz-Orientierung vor oder neben dem Nexus
- Area: Homepage / Hub clarity
- Why it matters: Besucher sehen aktuell einen sicheren privaten Eingang, aber nicht, ob Nayyal ein Lehrer-Tool, AI-Studio, Research-Hub, Produktlabor oder persoenliches OS ist.
- Source anchor: Public HTML `Nayyal Nexus`, `Privater Zugang zu deinem persoenlichen Cockpit.`
- Proposed change: Eine kurze oeffentliche Startkarte entwerfen: `Nayyal ist Chris' kuratierter Hub fuer GE-Lernwerkzeuge, lokale AI/Hermes-Systeme und ausgewählte Projektfenster. Private Schul- und Finanzdaten bleiben geschlossen. Oeffentliche Demos erscheinen nur als sichere, anonymisierte Ausschnitte.`
- Risk / privacy note: Darf keine echten Namen, Schulfaelle, Diagnosen, Finanzdetails oder internen Verbandsinterna nennen.
- Effort: 20 min
- Substance score /10: 8
- Safe for Codex: yes, wenn nur lokal als Text-/Route-Entwurf; nein fuer Live-Deploy ohne Chris.
- Kill condition: Wenn Chris Nayyal bewusst komplett privat halten will, keine Public-Startkarte bauen.

### 2. Connector-Registry fuer Subpages
- Title: Jede Nayyal-Verbindung bekommt `mode`, `purpose`, `guardrail`, `status`
- Area: Subpage / Navigation
- Why it matters: Es gibt mehrere Welten: Stocks, Schulwerkstatt, LeseWerk, Wahren Playbook, Night Apps, Business-Ideen. Ohne Registry werden Links entweder zu versteckt oder zu riskant sichtbar.
- Source anchor: Schulwerkstatt-Report empfiehlt `sichere Nayyal-Connector-Verwaltung`; `nayyalSiteStructure.ts` hat bereits `purpose` und `dataGuardrail`.
- Proposed change: Lokales Schema fuer Connectoren definieren: Ziel, Modus `public|research|private`, Zweck, Datenschutzregel, geprueft-am, sichtbarkeit, Proof-Status.
- Risk / privacy note: Registry darf keine Secrets, Passwort-URLs, private Portfoliozahlen oder personenbezogene Schulinfos enthalten.
- Effort: 1 hour
- Substance score /10: 9
- Safe for Codex: yes, als lokale Struktur-/Testdatei ohne Deploy und ohne echte Private-Daten.
- Kill condition: Wenn noch keine Entscheidung Public/Research/Private getroffen ist, nur als Entwurf behalten.

### 3. Trust-Layer vor Produkt-Layer
- Title: Privacy- und Finanz-/Schul-Guardrails sichtbar als Vertrauensrahmen
- Area: Trust / Privacy / Guardrail
- Why it matters: Nayyal beruehrt zwei sensible Felder: Schule/GE und Finance-Research. Vertrauen entsteht nicht durch mehr Features, sondern durch klare Grenzen.
- Source anchor: Tests pruefen `assertNoPortfolioDataInShareableRoutes`; Cron-Regeln verbieten private Schul-/Finanzdaten; Public-Site ist passwortgeschuetzt.
- Proposed change: Eine Trust-Box fuer den Hub formulieren: `Keine echten Schuelerdaten. Keine Diagnosen. Keine Portfolio-/Broker-/Cash-Offenlegung. Research ist keine Anlageberatung. Private by default.`
- Risk / privacy note: Muss klar bleiben und darf keine falsche Compliance-Garantie versprechen.
- Effort: 20 min
- Substance score /10: 8
- Safe for Codex: yes, fuer lokalen Copy-Entwurf; nein fuer Veroeffentlichung ohne Review.
- Kill condition: Wenn die Trust-Box zu juristisch oder abschreckend wird, auf einfache Orientierung reduzieren.

### 4. Produktstory: `Curated Studio Hub`, nicht einzelne Super-App
- Title: Nayyal als kuratierter Studio-Hub positionieren
- Area: Product / Story / Positioning
- Why it matters: Die staerkste Story ist derzeit nicht eine einzelne App, sondern ein kontrollierter Hub mit Projektfenstern: GE-Lernwerkzeuge, Hermes OS, Research-Labs, Wahren Playbook.
- Source anchor: Schulwerkstatt-Cockpit nennt `lokales Schulwerkstatt OS`; Night-App-Report 2026-06-12 bremst ungetestete Expansion; lokale Reports zeigen mehrere Produktlinien.
- Proposed change: Hub-Narrativ: `Nayyal sammelt sichere Projektfenster aus Chris' Lern-, Vereins-, Research- und AI-Systemen. Sichtbar wird nur, was anonymisiert, geprueft und anschlussfaehig ist.`
- Risk / privacy note: Nicht salesy machen; keine Produktreife behaupten, solange Proof-Ledger keine echten Tests enthaelt.
- Effort: 1 hour
- Substance score /10: 7
- Safe for Codex: no, weil erst Chris' Positionierungsentscheidung noetig ist.
- Kill condition: Wenn Chris eine rein private Startseite will, Story nicht oeffentlich ausbauen.

### 5. Hermes-Nayyal Proof Board
- Title: Proof-Status statt Projektflut sichtbar machen
- Area: Meta-system Hermes + Nayyal
- Why it matters: Mehr Hub-Seiten ohne echte Nutzung wuerden nur Rauschen erzeugen. Ein Proof Board koennte zeigen: untested, tested_useful, tested_not_useful, parked.
- Source anchor: Proof-Ledger existiert, aber unter `## Real Entries` sind keine echten Eintraege; Night-App-Studio stoppt V2 ohne Proof.
- Proposed change: Lokales, nicht oeffentliches Proof-Board fuer Nayyal-Projekte: Projekt, Route, Modus, Proof-Status, letzter Test, naechste kleinste Aktion.
- Risk / privacy note: Darf keine Personendaten, Klassendaten oder Finanzdetails enthalten; oeffentliche Anzeige erst nach Review.
- Effort: 1 hour
- Substance score /10: 8
- Safe for Codex: yes, als lokale Markdown-/JSON-Struktur ohne Deploy.
- Kill condition: Wenn keine echten Tests nachgetragen werden, Board nicht ausbauen; sonst wird es nur Verwaltungsaufwand.

## Meta-Ebene: Was Hermes mit der Hub-Seite noch besser machen koennte
- Safe Connector Registry: eine kleine lokale Liste aller Nayyal-Verbindungen mit Modus, Zweck, Guardrail, Proof-Status und letztem Check.
- Route Inventory: automatisch aus `nayyalSiteStructure.ts`, Schulwerkstatt-Reports und Projektordnern eine sichere Karte erstellen, ohne Secrets oder private Daten.
- Product Proof Board: nur Projekte mit `tested_useful` duerfen als staerkere oeffentliche Fenster vorgeschlagen werden.
- Public/Research/Private Map: heutiges Companion-Artefakt als dauerhafte Entscheidungsreferenz nutzen.
- Weekly Hub Substance Review: nicht `mehr Seiten`, sondern einmal pro Woche: Orientierung, Datenschutz, Proof, naechste kleinste Link-Entscheidung.

## Codex-Ready Slice
- Type: HUMAN_REVIEW_FIRST
- Safe for Codex: no
- Mini execute prompt: keiner
- Why: Es gibt sichere lokale Codex-Kandidaten, besonders Connector-Registry und Proof-Board. Der Gewinner ist aber eine Struktur-/Sichtbarkeitsentscheidung: Chris muss erst Public/Research/Private bestaetigen, bevor Code oder Navigation angepasst wird.
- Handoff risk: Ein Handoff koennte sonst versehentlich oeffentliche Navigation, private Finance-Bereiche oder Schulwerkstatt-Connectoren zu frueh sichtbar machen.

## Befehlskarte
- Chris 5-Minuten-Befehl: Lies `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-12.md` und markiere eine Entscheidung: `Nayyal bleibt nur privater Nexus` oder `Nayyal bekommt eine kleine oeffentliche Orientierungskarte`.
- Codex-Befehl: keiner
- Hermes-Pruefbefehl: Morgen pruefen, ob Chris die Public/Research/Private-Grenze bestaetigt hat; nur dann eine lokale Connector-Registry oder Hub-Copy-Slice vorschlagen.
- Proof-Befehl: Wenn eine Projektseite als oeffentliches Fenster vorgeschlagen wird, zuerst im Proof-Ledger einen sicheren Status `tested_useful`, `tested_not_useful`, `untested` oder `parked` ohne Personen-/Finanzdaten eintragen.
- Stop-/Park-Befehl: Richtung parken, wenn Chris Nayyal weiterhin nur als privaten Passwort-Nexus nutzen will oder wenn kein sicherer oeffentlicher Zweck benannt werden kann.
- Nicht-ausfuehren: Keine Deploys, keine Logins, keine Passwortnutzung, keine privaten Finanzdaten, keine Broker-/Order-/Cashdetails, keine Schul- oder Personendaten, keine externen Sends, keine Commits/Pushes, kein Fuenferfeld.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Companion-Artefakt `Public/Research/Private Map` lesen und eine Grenze bestaetigen oder aendern.
- CHRIS_ENTSCHEIDET: Ob Nayyal oeffentlich nur Passwort-Nexus bleibt oder eine kleine oeffentliche Orientierungskarte plus sichere Projektfenster bekommen soll.
- BEOBACHTEN: Proof-Ledger bleibt leer; keine Produktstory als real wirksam behaupten, bis echte Tests eingetragen sind.
- SPAETER: Lokale Connector-Registry und Proof-Board als Codex-Slices, falls Chris die Grenze bestaetigt.
- BLOCKIERT: Live-Hub-Aenderung, oeffentliche Navigation und Codex-Handoff sind blockiert, bis die Public/Research/Private-Grenze bestaetigt ist.
- NICHT_TUN: Keine Live-Site-Aenderungen, keine privaten Stocks-/Portfolio-/Expenses-Inhalte oeffentlich machen, keine Schul-/Personendaten, keine Trading-Sprache, keine Fuenferfeld-Richtung.
- Naechste kleinste Aktion: `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-12.md` oeffnen und eine der zwei Hub-Grenzen waehlen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-hub-radar-2026-06-12.md`; Companion: `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-12.md`
