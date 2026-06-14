# Hermes Funktionen und naechste Schritte - 2026-06-02

Kurzueberblick fuer Chris: Was Hermes gerade automatisch macht, warum es sinnvoll ist, und was als naechstes daraus werden kann.

## Leitidee
Hermes ist aktuell kein einzelner Chatbot, sondern ein kleines persoenliches Betriebssystem: morgens Chancen und Risiken, tagsueber Ordnung und Handoffs, abends Unterrichtsvorbereitung, woechentlich Qualitaet/Material/VDS, monatlich Memory-Hygiene.

## Aktive Jobs
| Bereich | Job | Rhythmus | Sinn | Naechster Schritt |
|---|---|---|---|---|
| Business & Ideen | BUSINESS_IDEA_FIREWORK_DAILY | taeglich 09:30 | 5 kreative, aber gefilterte Ideen passend zu Schule, Produkt, Alltag und Chancen. | Gute Quelle fuer Night App Studio. Abends/Nachts nur 1 Idee bauen lassen, wenn Score passt. |
| Boerse / Risiko | AI_STOCK_RADAR_DAILY | Mo-Fr 09:35 | Research-only Radar fuer AI-Aktien, Watchlist und Trigger-Dossiers. | Weiter streng research-only. Keine echten Trades, keine Preisziele, keine Hebel. |
| Boerse / Risiko | INSTITUTIONAL_SELL_PRESSURE_DAILY | Mo-Fr 09:50 | Oeffentliche Sell-Pressure-Signale aus institutionellen Quellen/SEC-Kontext. | Mit Commander zusammenfassen lassen, nicht einzeln ueberreagieren. |
| Boerse / Risiko | STOCK_RISK_COMMANDER_DAILY | Mo-Fr 10:00 | Verdichtet Stock Radar und Sell Pressure zu einem kompakten Risiko-Morgenblick. | Als einzige Boersen-Entscheidungssicht nutzen; Einzelreports nur bei Bedarf lesen. |
| Boerse / Risiko | AI_STOCK_DEEPDIVE_WEEKLY | So 16:30 | Raeumt Watchlist, False Positives und veraenderte Thesen auf. | Nach 2-3 Wochen pruefen, ob der Radar zu viele/zu wenige Kandidaten erzeugt. |
| Control / Ordnung | HERMES_CONTROL_DAILY | taeglich 10:15 | Tages-Control: Decision Inbox, offene Handoffs, Jobs, Risiken, naechste kleinste Aktion. | Night App Studio morgens hier sichtbar machen, damit es nicht nebenher laeuft. |
| Control / Ordnung | CODEX_HANDOFF_SCOUT_DAILY | taeglich 10:30 | Macht aus genau einem sicheren Decision-Inbox-Punkt einen Codex-Handoff. | Night-App-Prototypen nur dann an Codex geben, wenn Scope klein und Sandbox klar ist. |
| Control / Ordnung | HERMES_HANDOFF_JANITOR_DAILY | taeglich 10:35 | Haelt Codex Inbox, Outbox und Archiv sauber. | Weiterlaufen lassen; verhindert Prototypen- und Handoff-Stau. |
| Control / Ordnung | HERMES_MEMORY_CURATOR_MONTHLY | monatlich 1., 10:15 | Findet stabile Regeln und raeumt Memory-Ballast auf. | Night-Studio-Learnings erst nach mehreren guten Laeufen ins Memory heben. |
| Schule / GE | TEACHER_NEXTDAY_DAILY | taeglich 20:45 | Praktischer Plan fuer morgen: 3 Ziele, 3 Mikro-Bausteine, Material, Beobachtungsfrage. | Als Quelle fuer App-Ideen nutzen: Was immer wieder vorkommt, kann Mini-App werden. |
| Schule / GE | WOCHENPLAN_GE_SONNTAG | So 17:30 | GE-Wochenplanung mit Differenzierung und Lernwerkstatt-Anschluss. | Night Studio kann Sonntagsideen in kleine Tools uebersetzen, aber erst nach Score-Gate. |
| Schule / GE | LERNWERKSTATT_QUALITY_WEEKLY | Mo 10:15 | Qualitaetsreview der GE-Lernwerkstatt, keine automatische Umsetzung. | Gute Quelle fuer Verbesserungs-Slices; nicht parallel zum Night Studio ueberladen. |
| Schule / GE | LESEWERK_QUALITY_WEEKLY | Di 11:30 | Prueft LeseWerk gegen GE-Spielraum-Qualitaet und empfiehlt einen naechsten Slice. | Moegliche Night-App-Richtung: kleine Lese-/Lautgebärden-Tools. |
| Schule / GE | LERNWERKSTATT_GAME_LAB_WEEKLY | Mi 10:15 | Entwirft genau ein Lernspielkonzept, ohne Code zu bauen. | Starke Quelle fuer Night-Studio-Kandidaten; nur Gewinner bauen. |
| Schule / GE | GE_MATERIAL_SCOUT_WEEKLY | Mi 11:00 | Verdichtet lokale Materialhinweise und Wochenplaene zu Materialentscheidungen. | Night-App-Richtung: Materialkorb-Builder, Stationenkarten-Mixer. |
| Schule / GE | LERNWERKSTATT_TESTPILOT_WEEKLY | Do 10:15 | Testet genau eine Uebung/einen Flow aus GE-Perspektiven. | Night-Prototypen nach 1-2 Tagen durch Testpilot bewerten lassen. |
| VDS / Rolle | VDS_GE_MONITOR_WEEKLY | Fr 10:15 | Sachsen-Anhalt/VDS-GE Briefing mit Quellen, Argumenten, Praxis-Transfer. | Moegliche App-Richtung: Argumentationskarten, Quellenkompass, VDS-Briefing-Helfer. |
| Werkzeuge | AGENT_TOOLS_SCOUT_SCHULWERKSTATT_WEEKLY | Mo 10:45 | Maximal 3 relevante Agent-/OpenAI-/Hermes-Tool-Findings fuer deine Systeme. | Nur Sandbox-Tests, keine Hype-Updates. Hermes v0.15.2 ist Update-Kandidat im Wartungsfenster. |
| Admin | ADMIN_FREITAG_30MIN | Fr 15:45 | Schlanker Wochenabschluss fuer Schule, Hermes/Lernwerkstatt, Privat/Sport/Geld. | Night-Studio-Woche am Freitag mit bewerten: behalten, verbessern, wegwerfen. |

## Neues Konzept: Hermes Night App Studio v1
- **Ziel:** Jede Nacht maximal eine App-Chance pruefen. Code nur, wenn Score passt.
- **Start:** 01:30 Idee/Score, bis 06:30 Schluss, 08:00 Telegram-Briefing.
- **Bauen:** Nur isoliert in projects/night-lab/YYYY-MM-DD-name/. Kein Deploy, kein Commit, keine echten Daten.
- **Score-Gate:** morgen nutzbar, klein baubar, kein Datenschutzrisiko, keine externen APIs, klar testbar, passt zu Chris.
- **Erste Richtung:** Schulwerkstatt-/Lernwerkstatt-Mini-Apps: Lehrer-Morgenkarte GE als Pilot.
- **Telegram:** Status: gebaut / nur Konzept / gestoppt. Dazu Link, Bewertung, Screenshot-Hinweis, naechster Schritt.

## Weitere Moeglichkeiten
- **Night App Studio:** Starten mit manuellem Pilot oder kleinem Cron. Erst 3 Laeufe beobachten, dann ausbauen.
- **Hermes v0.15.2 Update:** Sandbox gruen. Produktiv nur im Wartungsfenster mit Backup und Neva-Kontrolle.
- **Execution Layer:** Wenn Control-Reports zweimal nuetzlich sind, spaeter in HERMES_CONTROL_DAILY verdrahten.
- **Rollenmatrix v2:** Bei echten Entscheidungen anwenden; noch keine neuen Profile erzwingen.
- **Agentmemory/Codex:** MCP-only behalten. Keine dauerhafte P4-Freigabe, bis echter Bedarf sichtbar ist.
- **codegraph P2:** Parken. Nur oeffentliches Toy-Repo, wenn konkreter Code-Verstaendnisfall entsteht.

## Empfehlung
Night App Studio als vorsichtigen Mittelweg starten: nicht blind jede Nacht bauen, sondern erst Idee + Score, dann maximal ein isolierter Mini-Prototyp. Erste Richtung: Lehrer-Morgenkarte GE. Versand per Telegram um 08:00 Uhr.