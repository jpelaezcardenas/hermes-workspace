# Nayyal Hub Radar - 2026-06-14

## Kurzfazit
Yellow. Nayyal.com ist oeffentlich erreichbar, zeigt aber derzeit eine Login-/Nexus-Grenze mit `noindex,nofollow`; das ist als private Hub-Grenze plausibel, erklaert aber externen Besuchern kaum, welche Welt hinter Nayyal steckt. Lokal ist vor allem `stocks.nayyal.com` als stark ausgebauter Research-/Private-Bereich sichtbar; der naechste Hebel ist deshalb keine neue Sales-Copy, sondern eine klare Public / Research / Private Karte.

## Best Next Nayyal Move
- Do: Die Public / Research / Private Map als Fuehrungsentscheidung pruefen: Welche Nayyal-Bereiche duerfen oeffentlich erklaert werden, welche bleiben research-shareable, welche bleiben strikt privat. Companion-Artefakt: `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-14.md`.
- Why: Die lokale Route-Map enthaelt bereits Guardrails fuer Research und private Finanzbereiche, aber die oeffentliche Hub-Grenze sagt noch nicht, wohin Besucher sollen oder was bewusst verborgen bleibt.
- Source: Public Check `https://www.nayyal.com/` Status 200 mit Login-Seite, `noindex,nofollow`, Titel `Nayyal Nexus`; lokale Quellen `src/nayyalSiteStructure.ts`, `src/nayyalSiteStructure.test.ts`, `dist/index.html`.
- Not now: Kein Deploy, kein Login, keine Finanzdaten, keine Portfolio-/Broker-/Cash-Details, keine V2-/Produktisierung ohne Proof, kein Fuenferfeld.

## Site / Hub Reading
- Public site: Geprueft. `https://www.nayyal.com/` liefert eine Login-Seite fuer `Nayyal Nexus`, mit Passwortfeld und `noindex,nofollow`. Keine oeffentliche Produkt-/Hub-Erklaerung sichtbar, was privat sicher sein kann, aber Orientierung reduziert.
- Local route map: `src/nayyalSiteStructure.ts` definiert ein Stocks-Command-Center mit Privacy-Typen `private`, `research-shareable`, `mixed` und Guardrails je Route.
- Confirmed subpages: `/`, `/portfolio`, `/research`, `/inbox`, `/decision`, `/confluence`, `/options`, `/x-traffic`, `/crowd`, `/shockboard`, `/early-warning`, `/signals`, `/ai-chain`, `/penny-finder`, `/government`, `/materials`, `/robotics`, `/expenses`.
- Private or guarded areas: `/portfolio` und `/expenses` sind private; `/` und `/research` sind mixed; viele Research-Routen sind shareable nur als Recherchekontext, nicht als Anlagehandlung.
- Missing/unclear areas: Keine klare oeffentliche Hub-Karte fuer Schulwerkstatt/LeseWerk/GE-Tools, Wahren Playbook, Hermes OS, Nayyal Research und private Grenzen. Unklar ist, ob Nayyal.com nur Gate bleiben soll oder eine knappe oeffentliche Orientierung vor dem Gate bekommt.

## Five Improvement Candidates

### 1. Login-Gate mit 3-Zonen-Erklaerung
- Title: Vor dem Gate erklaeren: Public, Research, Private
- Area: Homepage/hub clarity
- Why it matters: Besucher sehen heute vermutlich nur ein schoenes, aber schweigsames Login-Gate. Eine kurze, sichere 3-Zonen-Erklaerung wuerde Orientierung schaffen, ohne private Bereiche zu oeffnen.
- Source anchor: Public HTML von `https://www.nayyal.com/`: Login-Seite, Titel `Nayyal Nexus`, `noindex,nofollow`.
- Proposed change: Unter dem Login eine nicht-sensitive Microcopy: `Nayyal ist Chris' geschuetzter Hub fuer Bildungswerkzeuge, Recherche-Studios und private Cockpits. Oeffentlich: Projektueberblick. Research: kuratierte Demos ohne private Daten. Privat: Portfolio, Schule, Accounts, Rohdaten.`
- Risk / privacy note: Muss ohne echte Schueler-, Finanz-, Account- oder interne Verbandsdaten bleiben; falls die Site bewusst komplett privat sein soll, nur intern dokumentieren.
- Effort: 20 min
- Substance score /10: 8
- Safe for Codex: yes, nur nach Chris' Public-Gate-Entscheidung
- Kill condition: Wenn Chris Nayyal.com weiterhin als vollstaendig stilles Privat-Gate ohne oeffentliche Erklaerung will.

### 2. Route Inventory als sichtbarer Connector-Index
- Title: Nayyal Connector Registry aus `nayyalSiteStructure.ts`
- Area: Subpage/navigation
- Why it matters: Die Stocks-App hat viele gute Spezialrouten, aber ohne zentralen Index droht sie wie ein internes Labyrinth zu wirken. Eine Registry trennt private, mixed und research-shareable Ziele.
- Source anchor: `src/nayyalSiteStructure.ts` mit 18 Routen und Guardrails; Tests pruefen private Portfolio-/Expenses-Grenzen.
- Proposed change: Lokale `route-inventory`-Sektion oder Markdown-Registry mit Spalten Route, Zweck, Privacy, Guardrail, Sichtbarkeit.
- Risk / privacy note: Darf keine echten Holdings, Cash, Broker, Orders oder Performancewerte enthalten; Route-Namen sind ok, Inhalte muessen abstrakt bleiben.
- Effort: 1 hour
- Substance score /10: 9
- Safe for Codex: yes, als lokale Datei/Test-Slice ohne Deploy
- Kill condition: Wenn die Route-Map nur fuer interne Entwickler gedacht ist und nicht ins Hub-Konzept gehoert.

### 3. Trust-Layer fuer Finanz- und Schulgrenzen
- Title: Ein Trust-Banner fuer `Research is not action`
- Area: Trust/privacy/guardrail
- Why it matters: Die Finance-/Stock-Routen nutzen starke Research-Sprache. Ein sichtbarer Trust-Layer verhindert, dass Research-Scoring wie Handelsberatung oder automatische Handlung wirkt.
- Source anchor: Guardrails in `src/nayyalSiteStructure.ts`, z.B. `/options`, `/confluence`, `/early-warning`, `/penny-finder`; Proof Ledger ohne Real Entries.
- Proposed change: Wiederverwendbare Copy-Regel: `Research-Hinweise sind Pruefauftraege, keine Kauf-/Verkaufs-/Halteempfehlungen und keine Orderlogik. Private Portfolio-, Broker-, Cash- und Steuerdaten bleiben unsichtbar.`
- Risk / privacy note: Keine Anlageberatung, keine Buy/Sell/Hold-Sprache, keine privaten Zahlen. Schulbereich parallel: keine Namen, Diagnosen, Fotos, Klassenlisten.
- Effort: 20 min
- Substance score /10: 9
- Safe for Codex: yes, wenn nur lokale Copy-Komponente und Tests
- Kill condition: Wenn der Hub keinerlei Research-Inhalte oeffentlich oder halb-oeffentlich erklaeren soll.

### 4. Product Story: Curated Studio Hub statt einzelne Idee
- Title: Nayyal als kuratierter Studio-Hub
- Area: Product/story/positioning
- Why it matters: Die lokalen Quellen zeigen mehrere Welten: Schulwerkstatt/LeseWerk/GE-Tools, Wahren Playbook, Hermes OS und Stocks Research. Eine einzelne Produktstory waere zu eng; ein Studio-Hub kann sauber routen.
- Source anchor: Schulwerkstatt Product Map Report; TSV Playbook Dateien; Night App Studio Proof-Kiosk; lokale Stocks-App.
- Proposed change: Positionierung: `Nayyal ist ein geschuetzter Studio-Hub: oeffentliche Projektfenster, sichere Demos, private Cockpits.` Darunter 4 Karten: Bildung, Verein/Sport, AI/Hermes, Research.
- Risk / privacy note: Gefahr von Bauchladen. Muss klare Grenzen und Proof-Status nennen; keine unbewiesenen Apps als fertige Produkte verkaufen.
- Effort: later
- Substance score /10: 7
- Safe for Codex: no, erst Positionierungsentscheidung
- Kill condition: Wenn Chris Nayyal enger als privates Finanz-/Research-Cockpit fuehren will.

### 5. Hermes Proof Board fuer Nayyal
- Title: Hub-Substanz nur mit Proof-Status anzeigen
- Area: Meta-system Hermes + Nayyal
- Why it matters: Der Proof Ledger hat noch keine Real Entries. Ohne Proof droht die Hub-Seite gute, aber ungetestete Prototypen zu stark wirken zu lassen.
- Source anchor: `/Users/zondrius/hermes-workspace/inbox/chris-feedback/proof-ledger.md` ohne Real Entries; Night App Studio 2026-06-14 empfiehlt Proof-Kiosk.
- Proposed change: Lokales Proof Board: jede sichtbare Demo bekommt Status `untested`, `tested_useful`, `tested_not_useful`, `parked`; nur `tested_useful` darf als starkes Beispiel erscheinen.
- Risk / privacy note: Proof-Zeilen muessen anonym bleiben und duerfen keine Schueler-, Familien-, Gesundheits-, Finanz- oder Accountdaten enthalten.
- Effort: 1 hour
- Substance score /10: 8
- Safe for Codex: yes, als lokale Markdown-/JSON-Struktur ohne Deploy
- Kill condition: Wenn Chris den Proof-Prozess manuell im Ledger lassen will und kein Hub-Board braucht.

## Meta-Ebene: Was Hermes mit der Hub-Seite noch besser machen koennte
1. Safe Connector Registry: eine zentrale Liste aller Nayyal-/Schulwerkstatt-/Wahren-/Hermes-/Research-Pfade mit Sichtbarkeit, Guardrail und Proof-Status.
2. Public/Research/Private Map: genau festlegen, was erklaerbar, was demo-faehig und was strikt privat ist.
3. Product Proof Board: Demos nur nach Proof-Status anzeigen; ungetestete Prototypen als Lab/untested markieren.
4. Update Feed ohne Interna: woechentliche `Was ist neu?`-Karte mit nur nicht-sensiblen, lokal belegten Verbesserungen.
5. Nayyal OS Cockpit: internes Kontrollblatt, das Routen, Berichte, offene Chris-Entscheidungen und Codex-ready Slices verbindet.

## Codex-Ready Slice
- Type: HUMAN_REVIEW_FIRST
- Safe for Codex: no
- Mini execute prompt: keiner
- Why: Es gibt technisch sichere lokale Slices, vor allem Route Inventory und Trust Copy. Der Gewinner ist aber eine Sichtbarkeits-/Grenzentscheidung: Soll das Public-Gate ueberhaupt erklaeren, welche Bereiche existieren? Das sollte Chris vor Code/Deploy entscheiden.
- Handoff risk: Ohne Entscheidung koennte Codex oeffentliche Copy fuer Bereiche schreiben, die privat bleiben sollen. Keine Handoff-Datei erstellt.

## Befehlskarte
- Chris 5-Minuten-Befehl: Oeffne `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-14.md` und markiere pro Abschnitt genau eine Entscheidung: `so lassen`, `oeffentlich erklaeren`, `nur intern`, oder `streichen`.
- Codex-Befehl: keiner
- Hermes-Pruefbefehl: Morgen pruefen, ob Chris eine Public/Research/Private-Grenze entschieden hat; nur dann einen lokalen Route-Inventory- oder Trust-Copy-Slice vorschlagen.
- Proof-Befehl: Keine Produkt-/Demo-Behauptung auf Nayyal sichtbar machen, solange der Proof Ledger keine echte anonymisierte `tested_useful`-Zeile fuer diese Demo enthaelt.
- Stop-/Park-Befehl: Diese Richtung parken, wenn Nayyal.com bewusst nur privates Login-Gate ohne oeffentliche Orientierung bleiben soll.
- Nicht-ausfuehren: Keine Deploys, keine Logins, keine privaten Daten, keine Finance-private Exposure, keine externen Sends, keine Commits/Pushes, keine Installationen, kein Fuenferfeld.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Die companion Map lesen und die Sichtbarkeit fuer Public / Research / Private markieren.
- CHRIS_ENTSCHEIDET: Ob Nayyal.com vor dem Login eine knappe oeffentliche 3-Zonen-Erklaerung zeigen darf.
- BEOBACHTEN: Route Inventory und Trust-Banner als spaetere lokale Codex-Slices, falls Chris die Grenzen bestaetigt.
- SPAETER: Studio-Hub-Story mit Bildung, Verein/Sport, AI/Hermes und Research erst nach Proof-/Sichtbarkeitsentscheidung.
- BLOCKIERT: Live-Site-Aenderung und Codex-Handoff fuer Public Copy ohne Chris' Grenzentscheidung.
- NICHT_TUN: Kein Deploy, kein Login, keine privaten Portfolio-/Broker-/Cash-/Schul-/Accountdaten, keine Anlageberatung, keine Fuenferfeld-Rueckkehr.
- Naechste kleinste Aktion: `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-14.md` pruefen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-hub-radar-2026-06-14.md`
