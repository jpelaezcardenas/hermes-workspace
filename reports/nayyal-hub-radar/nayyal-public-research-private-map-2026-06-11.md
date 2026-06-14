# Public

Purpose: Oeffentliche Orientierung ohne Login: erklaeren, was Nayyal ist, und nur sichere Demo- oder Infofenster zeigen.

Allowed routes/examples: Root-Gate `https://www.nayyal.com/` als geschuetzter Einstieg; spaetere public Beispiele nur als ausdruecklich freigegebene Demo-Links wie eine Schulwerkstatt-Demo, ein Wahren-Playbook-Ueberblick oder ein Hermes-OS-Erklaerfenster.

What stays hidden: Passwortbereiche, private Cockpit-Inhalte, Schueler-/Eltern-/Diagnose-/Schuldaten, Verbandsinterna, Portfolio-, Broker-, Cash-, Order- oder Steuerdetails, geheime Links und Keys.

Trust rule: Public heisst erklaerend und sicher, nicht vollstaendig. Jede public Verbindung braucht Guardrail, Status und Kill Condition vor Sichtbarkeit.

Next smallest action: Einen einzigen Public-Gate-Satz als Kandidat festhalten: `Nayyal ist Chris' geschuetzter Projekt- und Research-Hub mit wenigen freigegebenen Demo-Fenstern.`

# Research

Purpose: Arbeits- und Pruefraum fuer Themen, Signale, Quellen, App-Ideen und Produktentscheidungen, die nicht automatisch oeffentlich oder privat-operativ sind.

Allowed routes/examples: Lokale Stocks-Research-Routen aus `nayyalSiteStructure.ts` wie `/research`, `/inbox`, `/decision`, `/confluence`, `/options`, `/x-traffic`, `/shockboard`, `/early-warning`, `/signals`, `/ai-chain`, `/penny-finder`, `/government`, `/materials`, `/robotics`; Hermes-Reports als interne Belege; Night-App- und Business-Ideen nur als Metadaten oder Review-Auszug.

What stays hidden: Reale Portfolio- und Kontodaten, Orderabsichten, Brokerdetails, private Ausgaben, personenbezogene Schuldaten, interne sensible Kommunikation und nicht freigegebene Rohreports.

Trust rule: Research bedeutet Pruefen, nicht Handeln. Keine Anlageberatung, keine Buy/Sell/Hold-Sprache, keine automatischen Orders, keine Portfolioaenderung.

Next smallest action: Einen wiederverwendbaren Research-Trust-Satz fuer alle research-shareable Routen definieren.

# Private

Purpose: Persoenliches Cockpit fuer vertrauliche Steuerung, Passwoerter/Gates, private Projekte, Finanzen, interne Schul-/Verbandskontexte und nicht freigegebene Experimente.

Allowed routes/examples: `/portfolio`, `/expenses`, passwortgeschuetzte Nayyal-Bereiche, private Hermes-Reports, lokale Schulwerkstatt-Verwaltung, nicht freigegebene Projektlinks und geschuetzte Entscheidungsboards.

What stays hidden: Alles mit Personenbezug, Schueler-/Eltern-/Diagnose-/Gesundheitsdaten, echte Finanz-/Broker-/Cash-/Order-/Steuerinformationen, Secrets, Tokens, passwortgeschuetzte Ziel-URLs und unfertige interne Bewertungen.

Trust rule: Private bleibt private, auch wenn es technisch verlinkbar ist. Private Inhalte duerfen nicht durch Hub-Navigation, Screenshots, Changelogs oder Demo-Kopien nach public oder research rutschen.

Next smallest action: Eine lokale Connector-Registry planen, die `private` und `guarded` explizit markiert und Public-Links gegen private Ziele blockiert.
