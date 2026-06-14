# Nayyal Public / Research / Private Map - 2026-06-10

## Public
- Purpose: Oeffentliche Besucher sollen in wenigen Sekunden verstehen: Nayyal ist Chris' kuratierter Hub fuer sichere Projektfenster, Demos und Arbeitsweisen, nicht der komplette private Arbeitsraum.
- Allowed routes/examples: Passwort-Gate `Nayyal Nexus` als geschuetzter Einstieg; kuenftige sichere Public-Karte mit Schulwerkstatt-/GE-Demo ohne Personendaten, Wahren Playbook als Vereins-/Trainingskonzept, Hermes OS als Arbeitsweise, Changelog oder Proof Board ohne private Rohdaten.
- What stays hidden: Logins, Passwoerter, interne Cockpit-Inhalte, echte Schul-/Personen-/Familieninformationen, Verbandsinterna, Portfolio, Expenses, Broker, Cash, Orders, Steuerdetails und nicht gepruefte interne Links.
- Trust rule: Public darf Orientierung, Zweck, Demo-Belege und Grenzen zeigen; Public zeigt keine privaten Entscheidungen, keine Schul- oder Finanzrohdaten und keine Trading-Signale.
- Next smallest action: Einen lokalen `publicConnectorCandidates`-Block entwerfen, der nur erlaubte Public-Beispiele mit Status `confirmed`, `candidate` oder `blocked` fuehrt.

## Research
- Purpose: Research sammelt Signale, Dossiers und Pruefaufgaben, ohne daraus oeffentliche Empfehlungen oder automatische Handlungen zu machen.
- Allowed routes/examples: `/research`, `/inbox`, `/decision`, `/confluence`, `/options`, `/x-traffic`, `/shockboard`, `/early-warning`, `/signals`, `/ai-chain`, `/penny-finder`, `/government`, `/materials`, `/robotics` als research-shareable oder mixed, solange keine privaten Portfoliofelder enthalten sind.
- What stays hidden: Konkrete private Positionen, Orderabsichten, Brokerdaten, Cashlage, Steuerdetails, private Gewichtungen, Login-Daten und jede Sprache, die wie Buy/Sell/Hold-Anweisung oder Broker-Aktion wirkt.
- Trust rule: Research bedeutet Pruefung und Kontext, nicht Anlageberatung, nicht Trade-Ausfuehrung und nicht Veraenderung von Portfolio oder Cash.
- Next smallest action: Fuer research-shareable Routen einen wiederverwendbaren Trust-Satz definieren: `Nur Research. Keine Anlageberatung. Keine Orders. Keine privaten Portfolio-, Cash- oder Broker-Daten.`

## Private
- Purpose: Private Bereiche dienen Chris' persoenlichem Cockpit, Kontrolle, Finanzen, Ausgaben, geschuetzten Schul-/Arbeitskontexten und internen Entscheidungen.
- Allowed routes/examples: `/portfolio`, `/expenses`, private Cockpit-/Decision-Bereiche, lokale Control-Reports, interne Schulwerkstatt-Verwaltung, geschuetzte Nayyal-Nexus-Seiten hinter Passwort.
- What stays hidden: Portfoliozahlen, Cash, Broker, Orders, Steuerdetails, personenbezogene Schul-/Eltern-/Familieninfos, Diagnosen, private Notizen, Tokens, Passwoerter und unveroeffentlichte interne Strategien.
- Trust rule: Private bleibt privat by default; nur explizit gepruefte, anonymisierte und risikoarme Ausschnitte duerfen spaeter als Public- oder Research-Fenster erscheinen.
- Next smallest action: Im lokalen Routenmodell eine kleine Connector-Registry vorbereiten, die jeden moeglichen Link mit `visibility`, `status`, `guardrail` und `killCondition` beschreibt, bevor etwas sichtbar gemacht wird.
