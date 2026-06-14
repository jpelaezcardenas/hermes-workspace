# Hermes Wochenarchitekt Loop v1

## Ziel

Hermes erstellt jede Woche eine klare Wochenkarte fuer Chris. Die Wochenkarte verbindet Schule, Nayyal, Investment-Research, Night Apps, Admin/Alltag und Hermes-Qualitaet zu genau drei Wochenprioritaeten, drei Stop-/Park-Regeln und einem klaren Nicht-diese-Woche-Block.

## Definition of Done

- Ein aktiver Hermes-Cronjob `HERMES_WEEK_ARCHITECT_WEEKLY` laeuft sonntags um 20:05 Europe/Berlin.
- Der Job schreibt genau einen Report nach `/Users/zondrius/hermes-workspace/reports/week-architect/week-architect-YYYY-MM-DD.md`.
- Der Job liest die woechentlichen CEO-Quellen: Stop Doing, Proof CEO, Proof Ledger, Morning CEO, Schule, Nayyal, Investment-Research, Business Firework, Night Apps, Control.
- Der Job erzeugt keine App, kein Handoff, keinen Deploy, keinen Commit, keinen Kauf, keine Installation und keine externe Aktion.
- Der Job enthaelt keine Trading-, Buy-/Sell-/Hold-, Broker-, Options-, Margin- oder Leverage-Logik.
- `HERMES_MORNING_CEO_DAILY` kann die Wochenkarte ab Montag als Kontext lesen, aber nicht als zweite Tagesaktion behandeln.
- Ein Checkskript prueft Job, Prompt, Anbindung, Reportpfad, Overview und Setup-Report.

## Kontext

Hermes hat bereits viele Einzeljobs. Der Wochenarchitekt soll nicht mehr Output erzeugen, sondern den Output fuehren:

- `HERMES_STOP_DOING_WEEKLY` stoppt schwache oder wiederholte Themen.
- `HERMES_PROOF_CEO_WEEKLY` entscheidet, was Proof oder V2-Permission bekommt.
- `HERMES_WEEK_ARCHITECT_WEEKLY` macht daraus die praktische Wochenkarte.
- `HERMES_MORNING_CEO_DAILY` nutzt diese Wochenkarte als Hintergrund fuer taeglich genau eine kleine Aktion.

## Loop

1. Verstehen: Lies die neuesten relevanten Quellen der Woche und markiere fehlende Quellen sichtbar.
2. Planen: Waehle nicht mehr als drei Wochenprioritaeten.
3. Bauen: Schreibe genau eine Wochenkarte.
4. Pruefen: Kontrolliere, ob jede Prioritaet proof-sicher, klein und handhabbar ist.
5. Verbessern: Entferne alles, was nach Ideenliste, V2 ohne Proof, Produktisierung, Trading oder Aktionismus klingt.
6. Stoppen: Schreibe finalen Report und eine kurze Telegram-Zusammenfassung.

## Eval-Gate

- [ ] Genau drei Wochenprioritaeten oder weniger?
- [ ] Genau drei Stop-/Park-Regeln oder weniger?
- [ ] Eine klare Nicht-diese-Woche-Liste?
- [ ] Kein zweiter Tagesbefehl neben Morning CEO?
- [ ] Keine sensiblen Daten, keine echten Schuelerdaten, keine privaten Finanz-/Accountdaten?
- [ ] Keine externen Aktionen, Deploys, Installs, Commits, Pushes oder Kaeufe?
- [ ] Investment nur Research, keine Handlungsempfehlung?

## Nicht-Ziele

- Keine neue App bauen.
- Keine Unterseiten auf Nayyal deployen.
- Keine Codex-Handoffs erstellen.
- Keine Materialflut erzeugen.
- Keine Trading-Aktionen oder Finanzberatung.
- Keine echten Personen-, Schueler-, Broker- oder Accountdaten verarbeiten.

## Stop-Regel

Wenn Proof/Feedback fehlt und keine klare Wochenrichtung ableitbar ist, schreibt der Job `STOP / keine neue Wochenprioritaet` und empfiehlt nur eine kleine Proof-Aktion oder `nichts`.
