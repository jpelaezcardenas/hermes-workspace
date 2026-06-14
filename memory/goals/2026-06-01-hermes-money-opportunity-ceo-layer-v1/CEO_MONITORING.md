# CEO Monitoring: Hermes Money & Opportunity CEO Layer v1

Datum: 2026-06-01
Status: first-report-in-progress
Owner: Chris / Neva / Codex

## Gate 1: Scope

Passes if:

- The v1 output is one CEO report.
- No new cronjob is created.
- No code, script, UI, API or app file is changed.
- No new agent profile is created.

Current decision:

```text
Manual first report only.
```

## Gate 2: Money Safety

Passes if:

- No real-money action is executed.
- No broker, account, provider or API key is configured.
- No paid data source is proposed as `SOFORT_MACHEN`.
- Any purchase, provider, trading or publishing decision stays under `CHRIS_ENTSCHEIDET`.

Current decision:

```text
Money signal means no-spend opportunity test, not investment action.
```

## Gate 3: Boersen Research Boundary

Passes if:

- Stock content stays research-only.
- The report contains no buy, sell, hold, target price, stop-loss, leverage, short, options or certainty language.
- AI Stock Radar data gaps remain visible.
- Stock Risk Commander risk overrides are respected.

Current decision:

```text
Boerse is a watch/risk input, not the 7-day business test.
```

## Gate 4: School Data Safety

Passes if:

- No real student, parent, diagnosis, photo or private school data is used.
- GE classroom material is described generally and source-backed.
- Classroom smoke remains low-pressure: no grades, speed, ranking or deficit language.

Current decision:

```text
Use the existing Fuenferfeld Pilotpaket and anonymized/no-personal data only.
```

## Gate 5: Decision Quality

Passes if:

- At most three opportunities are ranked.
- Exactly one 7-day test is selected.
- Exactly one next smallest action is named.
- `SOFORT_MACHEN` has at most one safe action.
- `NICHT_TUN` blocks the most tempting wrong moves.

Current decision:

```text
Prefer school-to-product smoke over stock-provider expansion or broad product building.
```

## Post-Report Review Questions

Chris should review the first CEO report with these questions:

1. Is the chosen 7-day test small enough to actually do this week?
2. Does the report reduce decision load, or did it add another layer of noise?
3. Did the stock section stay research-only?
4. Did the money section produce a concrete no-spend improvement path?
5. Should this remain manual for one more run before any recurring job is considered?

## CEO Verdict Options

Use exactly one after review:

- `run-once-more`: repeat manually next week before automation.
- `convert-to-weekly-job`: create a separate future goal to wire it into Hermes jobs.
- `narrow-to-product`: keep only Schule-zu-Produkt and remove stock/money sections.
- `park`: keep the files, but do not continue this layer now.

## Decision Inbox

- Signal: Yellow
- SOFORT_MACHEN: Ersten CEO-Report lesen und den 7-Tage-Test nur als no-spend Material-/Produkt-Smoke behandeln.
- CHRIS_ENTSCHEIDET: Ob der Layer nach einem zweiten manuellen Lauf als Wochenjob eingerichtet werden soll.
- BEOBACHTEN: Ob der Report Entscheidungen wirklich leichter macht.
- SPAETER: Automatisierung, UI-Karte oder Cronjob nur nach zwei nuetzlichen manuellen Reports.
- BLOCKIERT: nichts
- NICHT_TUN: Keine Trades, keine Provider, keine neuen Cronjobs, keine echten Schuelerdaten, keine Produktveroeffentlichung.
- Naechste kleinste Aktion: Ersten Report erstellen und gegen die Gates pruefen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-money-opportunity-ceo-layer-v1/CEO_MONITORING.md`
