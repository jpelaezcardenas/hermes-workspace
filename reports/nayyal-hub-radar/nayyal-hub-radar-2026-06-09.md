# Nayyal Hub Radar - 2026-06-09

## Kurzfazit
Yellow. Nayyal.com ist oeffentlich erreichbar, zeigt aber weiterhin nur ein Passwort-Gate; das ist sicher, aber als Hub fuer neugierige Besucher kaum erklaerend. Lokal existiert eine starke Route-Map fuer Stocks/Research mit Guardrails, aber die Gesamtwelt Nayyal braucht eine explizite Public/Research/Private-Legende, damit Schulwerkstatt, Hermes OS, Wahren Playbook und Research nicht vermischt wirken.

## Best Next Nayyal Move
- Do: Die gestern begonnene Public/Research/Private-Map in eine konkrete Hub-Legende uebersetzen: drei sichtbare Kategorien, je ein Satz Zweck, ein sicherer Beispiel-Link und eine klare Grenze. Heute als lokales Artefakt: `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-09.md`.
- Why: Orientierung und Vertrauen verbessern sich ohne Login, Deploy, private Daten oder Finanzdetails. Die wichtigste offene Frage ist nicht Design, sondern Grenzziehung: Was darf oeffentlich erklaert werden und was bleibt privat?
- Source: Public-Check `https://www.nayyal.com/` zeigte nur Passwort-Gate `Nayyal Nexus`; lokale Route-Map `/Users/zondrius/Documents/New project/src/nayyalSiteStructure.ts` bestaetigt 16 Stocks-/Research-Routen mit Privacy-Feld und Guardrails; Schulwerkstatt-Cockpit-Report nennt eine sichere Nayyal-Connector-Verwaltung als naechsten Schritt.
- Not now: Kein Deploy, keine Login-Pruefung, keine Portfolio-/Broker-/Cash-/Orderdetails, keine Fuenferfeld-Richtung, keine Vermischung von Schul-/Personendaten und oeffentlicher Hub-Erzaehlung.

## Site / Hub Reading
- Public site: Geprueft ohne Login. Status 200, sichtbar nur Passwort-Gate mit Titel `Nayyal Nexus`, Hinweis `Privater Zugang zu deinem persoenlichen Cockpit` und `Alle bestehenden Projektlinks bleiben separat erreichbar`. Inhalt hinter dem Gate nicht geprueft.
- Local route map: `/Users/zondrius/Documents/New project/src/nayyalSiteStructure.ts` definiert 16 Routen mit `privacy`, `purpose` und `dataGuardrail`. Schwerpunkt: Stocks/Research.
- Confirmed subpages: `/`, `/portfolio`, `/research`, `/inbox`, `/decision`, `/confluence`, `/options`, `/x-traffic`, `/shockboard`, `/signals`, `/ai-chain`, `/penny-finder`, `/government`, `/materials`, `/robotics`, `/expenses`.
- Private or guarded areas: `/portfolio` und `/expenses` sind privat. Root `/` und `/research` sind gemischt. Alle Research-Seiten duerfen nur als Research-/Pruefraeume verstanden werden, nicht als Handels- oder Anlageanweisung.
- Missing/unclear areas: Eine oeffentliche Hub-Seite, die Lehrer/GE, Hermes OS, Wahren Playbook, sichere Demos, private Bereiche und Research-Bereiche in getrennten Einstiegen erklaert. Ebenfalls unklar: zentrale Connector Registry fuer sichere Links zwischen Schulwerkstatt, Nayyal und lokalen Demos.

## Five Improvement Candidates

### 1. Drei-Satz-Hub-Legende auf der oeffentlichen Startlogik
- Title: Public/Research/Private in 10 Sekunden verstehen
- Area: Homepage/hub clarity
- Why it matters: Das Passwort-Gate ist sicher, aber Besucher erfahren kaum, was Nayyal ist und warum manche Bereiche privat bleiben.
- Source anchor: Public-Check von `https://www.nayyal.com/` und vorhandenes `meta robots noindex, nofollow`.
- Proposed change: Vor oder neben dem Gate eine knappe Legende: Public = sichere Demos und Projektfenster; Research = kuratierte Analyse ohne Empfehlungen; Private = Cockpit, Portfolio, Schul-/Personengrenzen.
- Risk / privacy note: Muss ohne konkrete Finanz-, Schul-, Personen- oder Login-Details bleiben.
- Effort: 20 min
- Substance score /10: 9
- Safe for Codex: yes
- Kill condition: Wenn Chris Nayyal bewusst komplett privat ohne Erklaertext halten will.

### 2. Route-Inventory als sichtbare Connector-Tabelle vorbereiten
- Title: Nayyal Connector Registry statt Link-Sammlung
- Area: Subpage/navigation
- Why it matters: Schulwerkstatt, LW3, Stocks, Playbook und Demos brauchen eine kontrollierte Bruecke, sonst entstehen falsche oder zu private Links.
- Source anchor: Schulwerkstatt Ultra App-Cockpit v1 empfiehlt eine sichere Nayyal-Connector-Verwaltung; lokale Route-Map hat bereits Zweck und Guardrail-Felder.
- Proposed change: Lokale Tabelle mit Route, Zielgruppe, Sichtbarkeit, Status, Guardrail und naechster Pruefung. Start nur als Markdown/TS-Konzept, kein Deploy.
- Risk / privacy note: Keine geheimen URLs, Keys, Passwort-Hinweise oder privaten Schul-/Finanzdaten aufnehmen.
- Effort: 1 hour
- Substance score /10: 8
- Safe for Codex: yes
- Kill condition: Wenn es keinen stabilen Zielort fuer die Registry im Repo gibt.

### 3. Finance-Research-Warnschicht vor allen Stocks-Seiten
- Title: Research ist keine Handlung
- Area: Trust/privacy/guardrail
- Why it matters: Die Route-Map enthaelt viele finanznahe Research-Seiten. Ohne wiederholte Grenze koennte es wie Trading Advice wirken.
- Source anchor: `nayyalSiteStructure.ts` Guardrails: Research Scores sind keine Orders; Portfolio/Cash/Holdings bleiben privat.
- Proposed change: Wiederverwendbarer Trust-Block: `Nur Research. Keine Anlageberatung. Keine Orders. Keine privaten Portfolio-Daten.`
- Risk / privacy note: Keine Buy/Sell/Hold-Sprache, keine Broker- oder Positionsdaten, keine konkreten Handlungsaufrufe.
- Effort: 20 min
- Substance score /10: 8
- Safe for Codex: yes
- Kill condition: Wenn die Stocks-App nicht oeffentlich oder teilbar sein soll.

### 4. Produktgeschichte: Nayyal als kuratiertes Studio OS, nicht als Einzelprodukt
- Title: Studio Hub statt eine Verkaufsseite
- Area: Product/story/positioning
- Why it matters: Nayyal vereint GE-Tools, Hermes OS, Research, Playbook und Demos. Eine harte Sales-Story waere zu frueh und unsicher.
- Source anchor: lokale Reports zu Schulwerkstatt, Business Ideas, TSV Playbook und Night App Studio zeigen mehrere Produktlinien.
- Proposed change: Positionierung: `Nayyal ist Chris' kuratierter Projekt-, Lern- und Research-Hub mit sicheren oeffentlichen Fenstern und privaten Arbeitsraeumen.`
- Risk / privacy note: Oeffentlich nur belegbare Demos und sichere Projektbeschreibungen; keine internen Verbands-, Schul- oder Finanzdetails.
- Effort: 1 hour
- Substance score /10: 7
- Safe for Codex: no
- Kill condition: Wenn Chris erst eine einzelne Produktlinie priorisieren will, z.B. Schulwerkstatt oder Wahren Playbook.

### 5. Hermes-Hub-Pruefbrett fuer woechentliche Substanz
- Title: Nayyal Proof Board
- Area: Meta-system
- Why it matters: Der Hub braucht nicht nur Texte, sondern Belege: welche Demo funktioniert, welche Route ist privat, welche Seite ist veraltet, welcher Link ist sicher.
- Source anchor: Night App Studio Quality Gate und Decision-Inbox-Logik fordern Proof, Risiken und naechste Aktion.
- Proposed change: Lokales Markdown-Board: Demo/Route, letzter Check, Proof-Datei, Sichtbarkeit, Risiko, naechste kleinste Aktion.
- Risk / privacy note: Nur Status und sichere Pfade, keine privaten Inhalte, keine Screenshots mit sensiblen Daten.
- Effort: 1 hour
- Substance score /10: 8
- Safe for Codex: yes
- Kill condition: Wenn es bereits ein gepflegtes Cockpit gibt und ein weiteres Board nur Doppelpflege waere.

## Meta-Ebene: Was Hermes mit der Hub-Seite noch besser machen koennte
1. Safe Connector Registry: Jede Nayyal-Bruecke bekommt Zweck, Sichtbarkeit, Guardrail, letzten Check und Stop-Regel.
2. Public/Research/Private Map: Ein dauerhafter Sicherheitsrahmen fuer alle neuen Seiten, bevor Copy oder Design entstehen.
3. Product Proof Board: Nur Demos mit aktuellem Smoke-Test, Screenshot oder Report werden als oeffentlich anschlussfaehig markiert.
4. Route Inventory Watch: Hermes vergleicht lokale Route-Map, dist-Build und oeffentliche Gate-Realitaet, ohne Login oder Deploy.
5. Readiness Ladder: Jede Idee landet auf `private lab`, `research shareable`, `public demo`, `product candidate` oder `do not publish`.

## Codex-Ready Slice
- Type: HUMAN_REVIEW_FIRST
- Safe for Codex: no
- Mini execute prompt: keiner
- Why: Mehrere lokale Codex-Slices waeren technisch sicher, aber der heutige Gewinner betrifft eine oeffentliche Grenzentscheidung: Welche Hub-Legende darf sichtbar werden? Das sollte Chris zuerst bestaetigen.
- Handoff risk: Ohne Chris' Richtung koennte Codex eine sichtbare Public/Research/Private-Copy vorbereiten, die strategisch falsch ist. Kandidat 2 und 5 sind spaeter sichere lokale Slices, sobald die Grenze bestaetigt ist.

## Befehlskarte
- Chris 5-Minuten-Befehl: Entscheide fuer die Zielseite `Nayyal Nexus` genau einen sichtbaren Satz: `Nayyal ist ein privater Projekt- und Research-Hub mit ausgewaehlten oeffentlichen Demos.` Ja / Nein / anders formulieren.
- Codex-Befehl: keiner
- Hermes-Pruefbefehl: Morgen pruefen, ob die Public/Research/Private-Map in eine konkrete `connector registry` oder eine Startseiten-Copy-Section ueberfuehrt werden soll.
- Stop-/Park-Befehl: Parken, wenn Chris Nayyal vorerst komplett hinter dem Passwort-Gate ohne oeffentliche Erklaerung halten will.
- Nicht-ausfuehren: Keine Deploys, keine Logins, keine privaten Daten, keine Finance-private Exposure, keine externen Sends, keine Commits, keine Passwort- oder Key-Verarbeitung.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Companion-Artefakt `nayyal-public-research-private-map-2026-06-09.md` als sichere Hub-Grenzkarte lesen.
- CHRIS_ENTSCHEIDET: Ob die Startseite `Nayyal Nexus` einen sichtbaren Public/Research/Private-Erklaersatz bekommen darf.
- BEOBACHTEN: Route-Map `nayyalSiteStructure.ts` bleibt stark finance/research-lastig; pruefen, ob Schulwerkstatt/Hermes/Playbook als eigene oeffentliche Einstiege sichtbar werden sollen.
- SPAETER: Lokale Codex-Slices fuer Connector Registry und Proof Board vorbereiten, falls Chris die Grenzlogik bestaetigt.
- BLOCKIERT: Live-Site-Aenderung ist blockiert bis Chris eine oeffentliche Grenzformulierung freigibt.
- NICHT_TUN: Keine Fuenferfeld-Richtung, keine Trading-Sprache, keine privaten Portfolio-/Expense-/Brokerdetails, keine Schul- oder Personendaten oeffentlich machen.
- Naechste kleinste Aktion: Chris bestaetigt oder aendert den einen Satz fuer `Nayyal Nexus`.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-hub-radar-2026-06-09.md` und `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-09.md`
