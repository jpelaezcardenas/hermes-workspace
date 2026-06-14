# Nayyal Hub Radar - 2026-06-11

## Kurzfazit
Yellow. Die oeffentliche Seite ist weiterhin sicher als Passwort-Gate sichtbar, aber sie erklaert die Hub-Logik nur minimal. Lokal gibt es eine starke Stocks-/Research-Route-Map mit Privacy-Guardrails; der groesste Hebel ist jetzt nicht mehr neue Copy, sondern eine saubere Public/Research/Private-Grenze plus spaeter eine Connector-Registry.

## Best Next Nayyal Move
- Do: Die neue lokale Public/Research/Private-Map als Entscheidungsgrundlage nutzen und erst danach eine Connector-Registry bauen.
- Why: Die Map klaert, welche Bereiche oeffentlich erklaerend, research-shareable oder strikt privat sind. Das reduziert das Risiko, dass Schul-, Finanz- oder private Projektbereiche spaeter versehentlich als normale Hub-Links behandelt werden.
- Source: Public-Check `https://www.nayyal.com/` am 2026-06-11 zeigt ein Passwort-Gate `Nayyal Nexus`; lokale Datei `/Users/zondrius/Documents/New project/src/nayyalSiteStructure.ts` definiert Privacy- und Guardrail-Felder fuer Stocks-/Research-Routen; Proof Ledger verlangt kleine Proof-Aktionen statt Expansion ohne Test.
- Not now: Kein Deploy, kein Login, kein Live-Link-Umbau, keine privaten Finanzdaten, keine Schul-/Personendaten, keine Trading-Sprache, kein Fuenferfeld.

## Site / Hub Reading
- Public site: Geprueft ohne Login. Sichtbar: `Nayyal Nexus`, Passwortfeld, Button `Oeffnen`. Inhalt hinter dem Gate nicht geprueft.
- Local route map: `/Users/zondrius/Documents/New project/src/nayyalSiteStructure.ts` definiert `stocksNayyalRoutes` mit `path`, `label`, `sectionId`, `privacy`, `purpose`, `dataGuardrail`; Tests pruefen private Portfolio-/Expenses-Routen und Research-Guardrails.
- Confirmed subpages: `/`, `/portfolio`, `/research`, `/inbox`, `/decision`, `/confluence`, `/options`, `/x-traffic`, `/shockboard`, `/early-warning`, `/signals`, `/ai-chain`, `/penny-finder`, `/government`, `/materials`, `/robotics`, `/expenses`.
- Private or guarded areas: `/portfolio` und `/expenses` sind privat; Root und `/research` sind mixed; alle Finanz-/Research-Bereiche bleiben mindestens guarded oder research-shareable, nicht automatisch public.
- Missing/unclear areas: Eine separate `nayyalConnectorRegistry` existiert lokal noch nicht; es fehlt eine bestaetigte Entscheidung, ob `Public`, `Research`, `Private` die dauerhafte Nayyal-Hub-Taxonomie wird; Schulwerkstatt, Wahren Playbook und Hermes OS sind noch nicht als sichere Connector-Kandidaten modelliert.

## Five Improvement Candidates

### 1. Gate-Satz mit klarer Hub-Identitaet
- Title: Nayyal erklaert sich vor dem Passwort
- Area: Homepage / Hub clarity
- Why it matters: Besucher sehen ein sicheres Gate, aber nicht, ob Nayyal ein privates Cockpit, ein Projektstudio, eine Research-Zentrale oder ein Demo-Hub ist.
- Source anchor: Public-Check `https://www.nayyal.com/` zeigt nur `Nayyal Nexus`, Passwortfeld und Oeffnen-Button.
- Proposed change: Einen spaeteren Copy-Kandidaten festhalten: `Nayyal ist Chris' geschuetzter Projekt- und Research-Hub mit wenigen freigegebenen Demo-Fenstern.`
- Risk / privacy note: Der Satz darf keine privaten Projekte, Schueler-/Elterndaten, Finanzdetails, Verbandsinterna oder geheime Zielrouten nennen.
- Effort: 20 min
- Substance score /10: 7
- Safe for Codex: yes
- Kill condition: Stoppen, wenn Chris Nayyal komplett privat ohne oeffentliche Erklaerung halten will.

### 2. Connector-Registry nach Taxonomie-Entscheidung
- Title: Sichere Hub-Verbindungen statt lose Projektlinks
- Area: Subpage / Navigation
- Why it matters: Die Route-Map schuetzt Stocks Research, aber die Gesamtwelt aus Schulwerkstatt, Wahren Playbook, Hermes OS und Research braucht dieselbe Link-Disziplin.
- Source anchor: `nayyalSiteStructure.ts` hat Privacy/Guardrails; Schulwerkstatt-Cockpit-Report vom 2026-05-26 nennt sichere Nayyal-Connector-Verwaltung als naechsten Slice.
- Proposed change: Nach Chris' Kategorieentscheidung eine lokale Registry mit `label`, `target`, `visibility`, `status`, `guardrail`, `killCondition` anlegen.
- Risk / privacy note: Keine echten Keys, Passwortparameter, privaten URLs, Schueler-/Personendaten oder Finanzwerte aufnehmen.
- Effort: 1 hour
- Substance score /10: 9
- Safe for Codex: yes
- Kill condition: Stoppen, wenn sichere Zielrouten nicht bestaetigt sind oder wenn echte private Daten fuer die Registry noetig waeren.

### 3. Research-Guardrail als Standardbaustein
- Title: Research ist Pruefraum, nicht Anlageentscheidung
- Area: Trust / Privacy / Guardrails
- Why it matters: Routen wie Options, Confluence, X Traffic und Early Warning koennen sonst wie Handlungsempfehlungen wirken.
- Source anchor: Lokale Guardrails sagen wiederholt `not automatic buy`, `never creates trades`, `not expose holdings`.
- Proposed change: Standardtext fuer research-shareable Seiten: `Nur Research. Keine Anlageberatung. Keine Orders. Keine privaten Portfolio-, Cash- oder Broker-Daten.`
- Risk / privacy note: Keine Buy/Sell/Hold-Sprache, keine Broker-Aktion, keine privaten Portfolio- oder Orderdaten.
- Effort: 20 min
- Substance score /10: 8
- Safe for Codex: yes
- Kill condition: Stoppen, sobald eine Seite reale Portfolio- oder Kontodaten zeigt; dann private-only.

### 4. Produktstory als kuratierter Studio-Hub
- Title: Nayyal als Studio-Hub mit getrennten Sichtbarkeiten
- Area: Product / Story / Positioning
- Why it matters: Die staerkste Story ist nicht nur Stocks oder Schulwerkstatt, sondern ein sicher kuratierter Hub aus GE-Werkzeugen, Playbooks, Hermes OS und Research-Labs.
- Source anchor: Schulwerkstatt-Cockpit, Night-App-Studio-, Business-Ideen-, VDS-GE- und TSV-Playbook-Kontexte liegen lokal als wiederkehrende Projektwelten vor.
- Proposed change: Eine interne Legende `Public Demos`, `Research Labs`, `Private Cockpit` als Positionierungsgeruest nutzen.
- Risk / privacy note: Oeffentliche Story darf keine Schueler-, Eltern-, Diagnose-, Verbands- oder Finanzprivatdaten transportieren.
- Effort: later
- Substance score /10: 8
- Safe for Codex: no
- Kill condition: Stoppen, wenn Chris zuerst persoenlich entscheiden muss, welche Identitaet Nayyal nach aussen haben soll.

### 5. Proof-Board fuer Hub-Substanz
- Title: Nayyal Proof Ledger statt immer neue Ideen
- Area: Meta-system Hermes + Nayyal
- Why it matters: Der Proof Ledger sagt klar: ohne Test keine Produktisierung. Nayyal braucht deshalb nicht nur Routen, sondern Belege: Screenshot, Smoke-Test, menschliche Review oder Parkstatus.
- Source anchor: `/Users/zondrius/hermes-workspace/inbox/chris-feedback/proof-ledger.md`; heutige Map ist ein ungetesteter Strukturvorschlag.
- Proposed change: Ein spaeteres Hub-Proof-Board mit `route`, `visibility`, `proof_status`, `last_checked`, `next_action`, `privacy_risk` planen.
- Risk / privacy note: Nur Metadaten; keine privaten Reports kopieren, keine personenbezogenen Daten, keine Portfoliozahlen.
- Effort: 1 hour
- Substance score /10: 8
- Safe for Codex: yes
- Kill condition: Stoppen, wenn das Board private Inhalte duplizieren oder als Veroeffentlichungsfreigabe missverstanden wuerde.

## Meta-Ebene: Was Hermes mit der Hub-Seite noch besser machen koennte
- Eine sichere Connector-Registry fuehren, die jeden Ziel-Link mit Visibility, Status, Guardrail und Kill Condition prueft.
- Eine Route-Inventory-Pruefung bauen: Public-Gate, lokale Research-Routen, private Bereiche und Demo-Kandidaten werden gegeneinander abgeglichen.
- Ein Product Proof Board nutzen: Jede oeffentliche Demo braucht Beleg, Status und Privacy-Pruefung vor Sichtbarkeit.
- Eine kleine Update-/Changelog-Zone vorbereiten, aber nur fuer freigegebene, unkritische Projektfortschritte.
- Einen woechentlichen Hub-Substanz-Review machen: Was erklaert wirklich Orientierung, was ist nur internes Rauschen?

## Codex-Ready Slice
- Type: HUMAN_REVIEW_FIRST
- Safe for Codex: no
- Mini execute prompt: keiner
- Why: Es gibt zwar sichere lokale Codex-Slices fuer Registry oder Guardrail-Tests, aber der heutige Gewinner ist eine Strukturentscheidung: Chris sollte zuerst bestaetigen, ob `Public`, `Research`, `Private` die dauerhafte Nayyal-Taxonomie wird. Ohne diese Entscheidung wuerde Codex eine Struktur festschreiben, die eventuell nicht Chris' oeffentlicher Positionierung entspricht.
- Handoff risk: Mittel, wenn zu frueh implementiert: falsche Sichtbarkeit, Scheinsicherheit, doppelte Registry oder spaetere Umbenennung.

## Befehlskarte
- Chris 5-Minuten-Befehl: Oeffne `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-11.md` und markiere: `passt`, `umbenennen` oder `nicht so` fuer die drei Kategorien Public, Research, Private.
- Codex-Befehl: keiner
- Hermes-Pruefbefehl: Morgen pruefen, ob Chris die Taxonomie bestaetigt hat oder ob bereits eine `nayyalConnectorRegistry` existiert; falls nein, keine neue Implementierung doppeln.
- Proof-Befehl: Wenn Chris die Map liest, im Proof Ledger nur den Status `tested_useful`, `tested_not_useful` oder `parked` fuer `Nayyal Public/Research/Private Map` nachtragen; ohne Rueckmeldung bleibt sie `untested`.
- Stop-/Park-Befehl: Diese Richtung parken, wenn Chris Nayyal vorerst nur als privates Passwort-Cockpit ohne Public-/Research-Legende nutzen will.
- Nicht-ausfuehren: Keine Deploys, keine Logins, keine Passwort- oder Key-Verarbeitung, keine privaten Finanzdaten, keine Schul-/Personendaten, keine externen Sends, keine Commits/Pushes, keine Fuenferfeld-Richtung.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Chris prueft die neue Public/Research/Private-Map in 5 Minuten und entscheidet, ob diese Taxonomie als Nayyal-Struktur passt.
- CHRIS_ENTSCHEIDET: Soll Nayyal dauerhaft in `Public`, `Research`, `Private` gegliedert werden, oder braucht die Hub-Sprache andere Kategorien?
- BEOBACHTEN: Connector-Registry und Proof-Board als sinnvolle lokale Folgeslices, aber erst nach Kategorieentscheidung.
- SPAETER: Safe local Codex slice fuer `nayyalConnectorRegistry.ts` mit Tests; Research-Guardrail-Text als wiederverwendbarer Baustein.
- BLOCKIERT: Live-Hub-Aenderungen und externe Sichtbarkeit bleiben ohne Chris-Freigabe blockiert.
- NICHT_TUN: Fuenferfeld, Trading-Empfehlungen, private Portfolio-/Broker-/Cash-Details, Schul-/Personendaten, geheime Links, Logins, Deploys.
- Naechste kleinste Aktion: Chris entscheidet die drei Kategorien in der Companion Map; danach kann Hermes morgen einen konkreten Registry-Slice freigeben oder parken.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-hub-radar-2026-06-11.md` und `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-11.md`
