# Nayyal Public Research Private Map - 2026-06-14

## Public
- Purpose: Orientierung fuer neugierige Besucher, ohne private Inhalte offenzulegen. Erklaert, dass Nayyal ein geschuetzter Studio-Hub fuer Bildungswerkzeuge, Research-Demos, Vereins-/Sportideen und Hermes/AI-Systemarbeit ist.
- Allowed routes/examples: Eine oeffentliche Start-/Info-Karte vor oder neben dem Login; abstrakte Projektfenster wie Schulwerkstatt, LeseWerk, Wahren Playbook, Hermes OS, Demo-Katalog nur mit nicht-sensiblen Screenshots oder Platzhaltern.
- What stays hidden: Schueler-, Eltern-, Diagnose-, Klassen-, Foto-, Gesundheits-, Verbandsintern-, Portfolio-, Broker-, Cash-, Order-, Steuer-, Login- und Accountdaten.
- Trust rule: Public darf nur erklaeren, nicht beweisen durch private Daten; jede Demo braucht einen klaren Status wie untested, tested_useful, tested_not_useful oder parked.
- Next smallest action: Entscheiden, ob die Login-Seite eine kurze 3-Zonen-Erklaerung zeigen darf oder komplett still bleiben soll.

## Research
- Purpose: Kuratierte, teilbare Recherche- und Demo-Ebene fuer nicht-private Erkenntnisse, Routen und Pruefauftraege.
- Allowed routes/examples: Research-shareable Stocks-Routen wie `/inbox`, `/decision`, `/confluence`, `/options`, `/x-traffic`, `/crowd`, `/shockboard`, `/early-warning`, `/signals`, `/ai-chain`, `/penny-finder`, `/government`, `/materials`, `/robotics`; nur als abstrakte Recherche-Workflows und Guardrail-Beispiele.
- What stays hidden: Reale Holdings, Cash, Broker, Orders, Performance, Steuern, persoenliche Finanzlage, private Notizen, Rohdaten mit Personenbezug und jede automatische Handelslogik.
- Trust rule: Research ist Pruefauftrag, keine Kauf-/Verkaufs-/Halteempfehlung, keine Order, keine Portfolio-Aenderung und keine Finanzberatung.
- Next smallest action: Aus `src/nayyalSiteStructure.ts` eine lokale Route-Inventory-Tabelle mit Route, Zweck, Privacy und Guardrail ableiten, aber noch nicht deployen.

## Private
- Purpose: Geschuetzter Arbeitsbereich fuer persoenliche Cockpits, echte Daten, interne Steuerung und sensible Kontexte.
- Allowed routes/examples: `/portfolio`, `/expenses`, Login-geschuetzte Dashboards, private Schul-/Arbeitsmaterialien, interne Hermes-Berichte, Proof Ledger, Handoff-/Kontrollberichte.
- What stays hidden: Alles, was eine Person, Schule, Familie, Finanzlage, Account, Order, Steuerlage oder interne Entscheidung identifizierbar macht.
- Trust rule: Private bleibt standardmaessig unsichtbar; oeffentlich wird nur eine abstrahierte Struktur gezeigt, nie die Daten selbst.
- Next smallest action: Private Routen in der Route Map weiter testen: `/portfolio` und `/expenses` muessen private bleiben; mixed Routen brauchen explizite Copy-Grenzen.
