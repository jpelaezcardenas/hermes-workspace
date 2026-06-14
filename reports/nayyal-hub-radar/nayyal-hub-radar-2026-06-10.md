# Nayyal Hub Radar - 2026-06-10

## Kurzfazit
Yellow. Nayyal.com ist sicher abgeschirmt und oeffentlich nur als Passwort-Gate sichtbar; das ist datenschutzfreundlich, erklaert aber die Hub-Welt kaum. Lokal ist die Stocks-/Research-Route-Map stark und guardrail-orientiert, doch es fehlt noch eine sichere Connector-Registry fuer die Frage: Welche sichtbaren Projektfenster duerfen wohin fuehren?

## Best Next Nayyal Move
- Do: Aus der Public/Research/Private-Map einen lokalen `publicConnectorCandidates`-Entwurf machen: kleine Registry fuer sichere Hub-Verbindungen mit `label`, `target`, `visibility`, `status`, `guardrail` und `killCondition`.
- Why: Das verbessert Orientierung und Trust, ohne Live-Deploy, Login, private Daten oder Finanzdetails. Es verhindert, dass spaeter versehentlich private Research-, Schul- oder Finanzbereiche als normale Public-Links erscheinen.
- Source: Public-Check `https://www.nayyal.com/` am 2026-06-10 zeigt nur Passwort-Gate `Nayyal Nexus`; lokale Datei `/Users/zondrius/Documents/New project/src/nayyalSiteStructure.ts` definiert 16 Stocks-/Research-Routen mit Privacy und Guardrails; Schulwerkstatt-Cockpit-Report nennt eine sichere Nayyal-Connector-Verwaltung als naechsten Schritt.
- Not now: Kein Deploy, kein Login-Test, keine echten Portfolio-/Broker-/Cash-/Orderdetails, keine Schul-/Personendaten, kein Fuenferfeld, keine oeffentliche Sales-Seite.

## Site / Hub Reading
- Public site: Geprueft ohne Login. Status 200. Sichtbar sind `Nayyal Nexus`, `Privater Zugang zu deinem persoenlichen Cockpit`, Passwortfeld, Button `Oeffnen`, Hinweis `Alle bestehenden Projektlinks bleiben separat erreichbar`. Inhalt hinter dem Gate nicht geprueft.
- Local route map: `/Users/zondrius/Documents/New project/src/nayyalSiteStructure.ts` definiert `stocksNayyalRoutes` mit `path`, `label`, `sectionId`, `privacy`, `purpose`, `dataGuardrail` und Testfunktion gegen Portfolio-Leaks in shareable routes.
- Confirmed subpages: `/`, `/portfolio`, `/research`, `/inbox`, `/decision`, `/confluence`, `/options`, `/x-traffic`, `/shockboard`, `/early-warning`, `/signals`, `/ai-chain`, `/penny-finder`, `/government`, `/materials`, `/robotics`, `/expenses`.
- Private or guarded areas: `/portfolio` und `/expenses` sind privat; Root und `/research` sind mixed; Research-Shareable-Routen bleiben nur research-shareable, nicht automatisch public. Nayyal.com selbst ist durch Passwort-Gate guarded.
- Missing/unclear areas: Es fehlt eine lokale, testbare Connector-Registry fuer Public/Research/Private-Verbindungen; unklar bleibt, welche Projektfenster wirklich oeffentlich sichtbar sein sollen; Schulwerkstatt, Wahren Playbook und Hermes OS haben noch keine gemeinsame sichere Hub-Legende im lokalen Nayyal-Routenmodell.

## Five Improvement Candidates

### 1. Public-Gate mit einem einzigen Orientierungssatz
- Title: Nexus erklaert sich vor dem Passwort
- Area: Homepage / Hub clarity
- Why it matters: Das Gate ist sicher, aber fuer neugierige Besucher bleibt unklar, ob Nayyal eine Portfolio-App, ein Projekt-Hub, eine private Startseite oder ein Demo-Archiv ist.
- Source anchor: Public HTML von `https://www.nayyal.com/`: `Nayyal Nexus`, `Privater Zugang zu deinem persoenlichen Cockpit`, `Alle bestehenden Projektlinks bleiben separat erreichbar`.
- Proposed change: Einen Satz als spaeteren Copy-Kandidaten definieren: `Nayyal ist Chris' privater Projekt- und Research-Hub mit ausgewaehlten sicheren Demo-Fenstern.`
- Risk / privacy note: Der Satz darf keine privaten Projekte, Schuelerdaten, Finanzdaten oder interne Accounts nennen.
- Effort: 20 min
- Substance score /10: 7
- Safe for Codex: yes
- Kill condition: Stoppen, wenn Chris Nayyal komplett privat und ohne erklaerende Public-Copy halten will.

### 2. Public Connector Candidates statt lose Linkliste
- Title: Sichere Connector-Registry fuer Hub-Verbindungen
- Area: Subpage / Navigation
- Why it matters: Nayyal verweist laut Gate auf bestehende Projektlinks, aber ohne Registry bleibt unklar, welche Links public, research, private, confirmed, candidate oder blocked sind.
- Source anchor: Schulwerkstatt-Cockpit-Report empfiehlt eine sichere Nayyal-Connector-Verwaltung; `nayyalSiteStructure.ts` hat bereits Privacy-/Guardrail-Felder fuer Stocks-Routen.
- Proposed change: Lokal einen `publicConnectorCandidates`-Entwurf planen, der nur Metadaten fuehrt: `label`, `target`, `visibility`, `status`, `guardrail`, `killCondition`. Keine Secrets und kein Deploy.
- Risk / privacy note: Keine echten geheimen URLs, keine Passwortparameter, keine Schul- oder Finanzrohdaten. Passwortgeschuetzte Ziele nur als guarded/private markieren.
- Effort: 1 hour
- Substance score /10: 9
- Safe for Codex: yes
- Kill condition: Stoppen, wenn die Registry echte Login-Links, Keys, personenbezogene Daten oder ungepruefte private Pfade aufnehmen muesste.

### 3. Research-Trust-Satz als Pflichtbaustein
- Title: Research ist Pruefraum, nicht Anlageberatung
- Area: Trust / Privacy / Guardrails
- Why it matters: Viele lokale Subpages behandeln Stocks, Options, X-Traffic, Shockboard und Early Warning. Ohne wiederholbaren Trust-Satz koennen sie wie Handlungsempfehlungen wirken.
- Source anchor: `nayyalSiteStructure.ts` nutzt `research-shareable` und Guardrails wie `never creates trades`, `not automatic buy`, `not expose holdings`.
- Proposed change: Standardtext fuer research-shareable Bereiche: `Nur Research. Keine Anlageberatung. Keine Orders. Keine privaten Portfolio-, Cash- oder Broker-Daten.`
- Risk / privacy note: Finanzseiten bleiben Research/private; keine Buy/Sell/Hold-Sprache, keine Broker-Aktionen, keine Portfoliozahlen.
- Effort: 20 min
- Substance score /10: 8
- Safe for Codex: yes
- Kill condition: Stoppen, wenn eine Seite konkrete private Portfolio- oder Orderdaten braucht; dann private-only.

### 4. Produktstory als Studio-Hub, nicht als einzelne App
- Title: Nayyal als kuratierter Studio-Hub
- Area: Product / Story / Positioning
- Why it matters: Die staerkste oeffentliche Erzaehlung ist nicht nur Stocks oder Schulwerkstatt, sondern ein sicher kuratierter Hub: GE-Werkzeuge, Wahren Playbook, Hermes OS und Research getrennt nach Sichtbarkeit.
- Source anchor: Gelesene lokale Kontexte: Schulwerkstatt-Cockpit mit Nayyal-Welten, TSV Playbook-Projekt, Business-Ideas-Reports, VDS-GE-Reports, Night-App-Studio-Reports.
- Proposed change: Eine interne Hub-Legende vorbereiten: `Public Demos`, `Research Labs`, `Private Cockpit`. Jede Kategorie bekommt Zweck, erlaubte Beispiele und klare Grenzen.
- Risk / privacy note: Oeffentliche Story darf keine Schueler-, Eltern-, Diagnose-, Verbandsinterna- oder Finanzprivatdaten beruehren.
- Effort: later
- Substance score /10: 8
- Safe for Codex: no
- Kill condition: Stoppen, wenn Chris zuerst persoenlich entscheiden muss, welche Identitaet Nayyal oeffentlich haben soll.

### 5. Hermes prueft Hub-Substanz als woechentliche Karte
- Title: Hub Substance Board fuer Nayyal OS
- Area: Meta-system Hermes + Nayyal
- Why it matters: Der Radar produziert viele gute Einzelideen. Ein Meta-Board wuerde verhindern, dass Copy, Routen, Datenschutz, Demos und Handoffs auseinanderlaufen.
- Source anchor: Decision-Inbox-Logik, Night-App-Studio-Reports, Control-Reports, bestehende Route-Tests und heutige Public/Research/Private-Map.
- Proposed change: Eine lokale Proof-Board-Struktur definieren: `route`, `status`, `proof`, `privacy`, `lastChecked`, `nextAction`, `ownerMode`.
- Risk / privacy note: Nur Metadaten und sichere Pfade; keine privaten Inhalte, keine Logs, keine personenbezogenen Daten.
- Effort: 1 hour
- Substance score /10: 8
- Safe for Codex: yes
- Kill condition: Stoppen, wenn das Board private Reports oder sensitive Rohdaten duplizieren wuerde.

## Meta-Ebene: Was Hermes mit der Hub-Seite noch besser machen koennte
- Eine sichere Connector-Registry pflegen: jeder Link bekommt Visibility, Status, Guardrail und Kill Condition, bevor er irgendwo sichtbar wird.
- Eine Route-Inventory-Pruefung bauen: lokale Routen, Public-Gate, Research-Routen und private Bereiche werden regelmaessig gegen Privacy-Regeln abgeglichen.
- Ein Product Proof Board fuehren: welche Demo existiert, welcher Screenshot/Smoke-Test belegt sie, was darf oeffentlich gezeigt werden, was bleibt intern.
- Eine Public/Research/Private-Legende als wiederverwendbaren Baustein fuer Nayyal, Schulwerkstatt, Wahren Playbook und Hermes OS nutzen.
- Einen Mini-Changelog fuer sichere oeffentliche Updates vorbereiten, aber erst nach Chris' Freigabe fuer Sichtbarkeit und Ton.

## Codex-Ready Slice
- Type: CODEX_HANDOFF_READY
- Safe for Codex: yes
- Mini execute prompt: /goal In `/Users/zondrius/Documents/New project/src/`, add a small local-only Nayyal connector registry module and tests. Create `nayyalConnectorRegistry.ts` exporting a typed array `nayyalConnectorCandidates` with only safe metadata fields: `label`, `target`, `visibility` (`public` | `research` | `private` | `guarded`), `status` (`confirmed` | `candidate` | `blocked`), `guardrail`, and `killCondition`. Seed it with placeholder-safe entries for `Nayyal Nexus`, `Schulwerkstatt Cockpit`, `Wahren Playbook`, `Hermes OS`, and `Stocks Research`, using no secrets, no password parameters, no private portfolio data and no student/person data. Add `nayyalConnectorRegistry.test.ts` verifying every candidate has a guardrail and killCondition, no target contains `key=`, `password`, `token`, `broker`, `cash`, `portfolio-value`, or real private values, and public entries do not point to private/research-only routes. Do not deploy, do not commit, do not change production/public HTML.
- Why: Das ist eine sichere lokale Strukturverbesserung mit Tests. Sie macht spaetere Hub-Navigation kontrollierbar, ohne Live-Seite oder private Daten zu beruehren.
- Handoff risk: Niedrig, solange Codex nur lokale Dateien schreibt und keine echten Links/Secrets erfindet. Menschliche Review bleibt vor jedem Deploy erforderlich.

## Befehlskarte
- Chris 5-Minuten-Befehl: Lies die Companion Map `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-10.md` und entscheide, ob `Public`, `Research`, `Private` als dauerhafte Nayyal-Hub-Kategorien gelten sollen.
- Codex-Befehl: /goal In `/Users/zondrius/Documents/New project/src/`, add a small local-only Nayyal connector registry module and tests. Create `nayyalConnectorRegistry.ts` exporting a typed array `nayyalConnectorCandidates` with only safe metadata fields: `label`, `target`, `visibility` (`public` | `research` | `private` | `guarded`), `status` (`confirmed` | `candidate` | `blocked`), `guardrail`, and `killCondition`. Seed it with placeholder-safe entries for `Nayyal Nexus`, `Schulwerkstatt Cockpit`, `Wahren Playbook`, `Hermes OS`, and `Stocks Research`, using no secrets, no password parameters, no private portfolio data and no student/person data. Add `nayyalConnectorRegistry.test.ts` verifying every candidate has a guardrail and killCondition, no target contains `key=`, `password`, `token`, `broker`, `cash`, `portfolio-value`, or real private values, and public entries do not point to private/research-only routes. Do not deploy, do not commit, do not change production/public HTML.
- Hermes-Pruefbefehl: Morgen pruefen, ob es bereits einen Connector-Registry-Handoff oder lokale Datei gibt; wenn ja, nicht doppeln, sondern nur Review/Status berichten.
- Stop-/Park-Befehl: Diese Richtung parken, wenn Chris Nayyal vorerst komplett privat ohne Public-Hub-Legende halten will oder wenn sichere Zielrouten nicht bestaetigt sind.
- Nicht-ausfuehren: Keine Deploys, keine Logins, keine Passwort-/Key-Verarbeitung, keine privaten Finanzdaten, keine Schul-/Personendaten, keine externen Sends, keine Commits/Pushes.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: Connector-Registry als lokalen, testbaren Codex-Slice vormerken; noch nicht deployen.
- CHRIS_ENTSCHEIDET: Soll Nayyal dauerhaft mit den drei Kategorien `Public`, `Research`, `Private` strukturiert werden?
- BEOBACHTEN: Ob Stocks-/Research-Routen weiter wachsen und neue Guardrails brauchen.
- SPAETER: Hub Substance Board und sichtbarer Gate-Orientierungssatz nach Chris' Kategorie-Entscheidung.
- BLOCKIERT: Keine Live-Homepage-Aenderung ohne Chris-Freigabe und keine bestaetigten Public-Zielrouten ausserhalb der bekannten Kontexte.
- NICHT_TUN: Fuenferfeld als Content-Richtung, Trading-Sprache, private Portfolio-/Broker-/Cash-Details, Schul-/Personendaten, Passwort- oder Secret-Links.
- Naechste kleinste Aktion: Chris entscheidet die drei Kategorien; danach kann der lokale Connector-Registry-Slice umgesetzt werden.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-hub-radar-2026-06-10.md` und `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-10.md`
