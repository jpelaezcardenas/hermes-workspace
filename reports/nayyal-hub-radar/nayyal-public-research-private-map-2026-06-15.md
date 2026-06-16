# Nayyal Public Research Private Map - 2026-06-15

## Public
- Purpose: Kurze Orientierung fuer neugierige Besucher, ohne private Inhalte zu zeigen: Nayyal ist ein geschuetzter Hub mit moeglichen oeffentlichen Werkstattfenstern fuer GE-Lernwerkzeuge, Hermes/AI-Systemarbeit und ausgewaehlte Projekt-Demos.
- Allowed routes/examples: `https://www.nayyal.com/` als stilles Nexus-Gate oder mit kurzer Public-Orientierung; public-safe Fenster zu Schulwerkstatt, LeseWerk, Wahren Playbook, Hermes OS oder Demo-Katalog nur als anonymisierte, nicht-sensitive Uebersicht.
- What stays hidden: Schueler-, Eltern-, Diagnose-, Klassen-, Foto-, Gesundheits-, Verbandsintern-, Portfolio-, Broker-, Cash-, Order-, Steuer-, Login-, Account- und Secret-Daten.
- Trust rule: Public erklaert Grenzen und Zwecke, aber beweist nichts mit privaten Daten; jede Demo braucht einen klaren Proof-Status und menschliche Freigabe vor Veroeffentlichung.
- Next smallest action: Eine lokale Connector-Registry-Spalte `visibility: public | research | private` plus `proof_status` als Strukturentscheidung entwerfen; noch nicht deployen.

## Research
- Purpose: Teilbare Denk- und Pruefebene fuer nicht-private Routen, Research-Workflows, Demo-Kataloge und Proof-Boards; sie zeigt Fragen, Checks und Guardrails, keine personenbezogenen oder finanziell privaten Daten.
- Allowed routes/examples: Research-shareable Stocks-Routen aus `src/nayyalSiteStructure.ts`: `/inbox`, `/decision`, `/confluence`, `/options`, `/x-traffic`, `/crowd`, `/shockboard`, `/early-warning`, `/signals`, `/ai-chain`, `/penny-finder`, `/government`, `/materials`, `/robotics`; `mixed`: `/` und `/research` nur mit klarer Copy-Grenze.
- What stays hidden: Reale Holdings, Cash, Broker, Orders, Performance, Steuern, private Ausgaben, private Rohdaten, personenbezogene Schulkontexte und automatische Handelslogik.
- Trust rule: Research ist Pruefauftrag, Watchlist oder Methode; keine Kauf-/Verkaufs-/Halteempfehlung, keine Order, keine Portfolio-Aenderung und keine Finanzberatung.
- Next smallest action: Aus der bestehenden `stocksNayyalRoutes`-Map eine lokale Route-Inventory-Tabelle ableiten: Route, Label, Sichtbarkeit, Zweck, Guardrail, Proof-Status.

## Private
- Purpose: Geschuetzter Arbeitsbereich fuer persoenliche Cockpits, echte Daten, interne Steuerung, Schul-/Arbeitskontexte und sensible Finanzbereiche.
- Allowed routes/examples: Nayyal Nexus hinter Passwort; `/portfolio`; `/expenses`; private Schulwerkstatt-Connectoren; lokale Hermes-Berichte; Proof Ledger; Handoff- und Kontrollberichte.
- What stays hidden: Alles, was eine Person, Schule, Familie, Gesundheit, Diagnose, Finanzlage, Account, Order, Steuerlage, Passwort oder internes Vorgehen identifizierbar macht.
- Trust rule: Private bleibt standardmaessig unsichtbar; jede Oeffnung braucht Human Review und eine explizite Sanitizing-Pruefung.
- Next smallest action: Private Routen weiter als rote Grenze behandeln: `/portfolio` und `/expenses` duerfen nie in public oder research kopiert werden; mixed Routen brauchen explizite Public-Copy.
