# Goal: Hermes Money & Opportunity CEO Layer v1

Status: approved-for-first-report
Start: 2026-06-01
Owner: Chris / Neva / Codex
Mode: CEO-Synthese ueber bestehende Hermes-Signale, keine neue Automatik

## Leitentscheidung

Hermes soll Chris nicht mit noch mehr getrennten Reports beschaeftigen. Hermes soll die vorhandenen Signale aus Geld, Boersen-Research, Business-Ideen und Schule-zu-Produkt einmal pro Woche zu einer CEO-Entscheidung verdichten.

Der Layer baut keine neue Boersenmaschine, kein neues Schulprodukt und keinen neuen Cronjob. Er liest vorhandene Hermes-Artefakte und beantwortet:

```text
Was kann Chris' Geld- und Chancenlage real verbessern?
Was ist nur Research und darf nicht zu Trading-FOMO werden?
Welche Business-Idee verdient einen 7-Tage-Test?
Welche Schul-/GE-Arbeit hat Produktpotenzial?
Was ist genau die naechste kleinste Aktion?
Was soll ausdruecklich nicht getan werden?
```

## Warum Dieses Goal Jetzt Sinn Ergibt

Hermes hat bereits starke Einzelteile:

- `AI_STOCK_RADAR_DAILY` fuer research-only AI-Aktien-Signale.
- `INSTITUTIONAL_SELL_PRESSURE_DAILY` fuer oeffentliche Sell-Pressure-Kontexte.
- `STOCK_RISK_COMMANDER_DAILY` fuer den kombinierten Boersen-Risikoblick.
- Hermes Control und Decision Inbox fuer Priorisierung und Nicht-Tun-Regeln.
- Productklarheit v1 fuer Schulwerkstatt, LeseWerk und Produkthebel.
- Classroom-Ready Pilotpaket v1 fuer realen GE-Unterrichtsnutzen.
- Execution Layer fuer den taeglichen kleinsten Slice.

Die Luecke ist die CEO-Verbindung:

- Boersen-Signale bleiben riskant und datenlueckenbehaftet.
- Business-Ideen brauchen harte 7-Tage-Tests.
- Schulideen koennen Produktpotenzial haben, duerfen aber Unterricht nicht ueberbauen.
- Geldthemen brauchen konkrete Entlastung statt weiterer Watchlisten.

## In Scope

- Einen ersten lokalen CEO-Report erstellen.
- Vorhandene lokale Reports lesen und zitieren.
- Money-, Boersen-, Business- und Schule-zu-Produkt-Signale trennen.
- Maximal drei Opportunities ranken.
- Genau einen 7-Tage-Test bestimmen.
- Genau eine naechste kleinste Aktion benennen.
- Eine klare Nicht-Tun-Liste schreiben.
- Alles in die bestehende Decision-Inbox-Logik einordnen.

## Out Of Scope

- Keine Trades.
- Keine Kauf-, Verkaufs- oder Halteempfehlungen.
- Kein Brokerzugriff.
- Keine bezahlten Datenprovider.
- Keine API-Key- oder Account-Einrichtung.
- Keine Short-, Derivate-, Hebel- oder Margin-Workflows.
- Kein neuer Cronjob in v1.
- Keine neuen Agentenprofile.
- Keine Codeaenderungen.
- Keine automatischen Memory Writes.
- Keine Veroeffentlichung, kein Verkauf, kein Versand und keine externe Account-Aktion.
- Keine echten Schueler-, Eltern-, Diagnose-, Foto- oder privaten Schuldaten.

## Quellen Fuer Den Ersten Lauf

Pflichtquellen:

- `/Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-radar-2026-06-01.md`
- `/Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-radar-ceo-audit-2026-06-01.md`
- `/Users/zondrius/hermes-workspace/reports/stock-risk-commander/stock-risk-commander-2026-06-01.md`
- `/Users/zondrius/hermes-workspace/reports/institutional-sell-radar/institutional-sell-radar-2026-06-01.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-06-01.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-execution-layer-2026-06-01.md`
- `/Users/zondrius/hermes-workspace/reports/productklarheit-v1-ceo-synthesis-2026-05-31.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-classroom-ready-pilotpaket-v1-2026-06-01.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-classroom-ready-pilotpaket-ceo-decision-2026-06-01.md`

## Output

Der erste CEO-Report wird hier geschrieben:

`/Users/zondrius/hermes-workspace/reports/hermes-control/money-opportunity-ceo-layer-2026-06-01.md`

## Report-Format

```markdown
## CEO Kurzfazit
## Money Signals
## Stock / Boersen Risk Review
## Business Ideas Ranking
## Schule-zu-Produkt Pipeline
## Top 3 Opportunities
## 7-Tage-Test
## Nicht Tun
## Quellen / Belege
## Decision Inbox
```

## CEO Scoring

Jede Opportunity bekommt 1 bis 10 Punkte in diesen Kriterien:

- Money Impact
- Fit zu Chris
- Speed to Test
- Risikoarmut
- Existing Hermes Evidence
- School/Product Leverage
- Required Effort

Die Gesamtwertung ist ein CEO-Prioritaetsurteil, keine Finanz-, Rechts- oder Verkaufsberatung.

## Erfolgskriterien

Das Goal ist erfolgreich, wenn:

- `GOAL.md`, `EXECUTE_PLAN.md` und `CEO_MONITORING.md` existieren.
- Der erste CEO-Report existiert.
- Der Report zitiert echte lokale Hermes-Dateien.
- Der Report trennt Money, Boerse, Business und Schule-zu-Produkt.
- Der Report nennt maximal drei Opportunities.
- Der Report nennt genau einen 7-Tage-Test.
- Der Report nennt genau eine naechste kleinste Aktion.
- Stock-Inhalte bleiben research-only und enthalten keine Kauf-/Verkaufsempfehlung.
- Die Decision Inbox enthaelt hoechstens eine sichere `SOFORT_MACHEN`-Aktion.

## Abbruchkriterien

Stoppen oder verkleinern, wenn:

- Der Report eine echte Anlageentscheidung formuliert.
- Aus Boersen-Research eine Handlung mit echtem Geld wird.
- Mehr als drei Opportunities gerankt werden.
- Mehr als ein 7-Tage-Test vorgeschlagen wird.
- Der Layer neue Cronjobs, Agenten, Codeaenderungen oder externe Services braucht.
- Schul-/GE-Potenzial mit echten Schuelerdaten vermischt wird.
- Die Quellenlage nicht belegt, sondern geraten ist.

## /goal Prompt

```text
/goal Build Hermes Money & Opportunity CEO Layer v1 as a CEO-level weekly decision layer for Chris. Do not rebuild existing stock, school, business, or execution systems. Read the existing AI Stock Radar, Stock Risk Commander, Institutional Sell Pressure, Decision Inbox, Productklarheit, GE/Lernwerkstatt, Classroom-Ready Pilotpaket, and Hermes Execution Layer reports. Produce one compact source-backed CEO report that combines money signals, stock-risk research signals, business ideas, school-to-product opportunities, and one safest next action. The system must separate research from real-money action, avoid trading advice, avoid student data, cite source files, rank at most 3 opportunities, name exactly one 7-day test, and explicitly say what not to do. In v1, create only local goal/report files and no new cronjob, no code changes, no installs, no external services, no provider setup, no automatic memory writes, and no trading workflow.
```
