# Hermes Life Loop Gap Audit - 2026-06-09

## Kurzfazit
Signal: Yellow-Green.

Hermes hat bereits ein starkes Grundsystem: GPT-5.5, Closed Loop, Nachtloop, Schule, Nayyal, Night Apps, Stock/Research, Control, Decision Inbox und Codex-Handoff. Es fehlt nicht "mehr Hermes". Es fehlen vor allem drei echte Loop-Schliesser:

1. Rueckmeldung aus der echten Nutzung.
2. Bessere Verdichtung in der Morgen-CEO-Meldung.
3. Wochen-/Archiv-Schicht, die Energie, Nutzen und Wiederholung ueber mehrere Tage bewertet.

## Aktueller Systemstatus
- Jobs gesamt: 26
- Aktiv: 25
- Pausiert: 1 (`NIGHT_APP_STUDIO_BRIEFING_DAILY`, bewusst durch Morgen-CEO ersetzt)
- Gateway: laeuft
- GPT-5.5-Policy: aktiv und verifiziert
- Night Loop Check: bestanden
- Naechster Lauf nach Pruefung: `HERMES_CONTROL_DAILY`, 2026-06-09 10:15

## Was schon wirklich da ist

### 1. Nachtloop / Tagesstart
Status: da, erster Lauf erfolgreich.

Jobs:
- `HERMES_NIGHT_RESULT_TUEV_DAILY`
- `HERMES_LIFE_BUILDER_NIGHTLY`
- `NIGHT_APP_STUDIO_BUILD_DAILY`
- `NAYYAL_HUB_RADAR_DAILY`
- `HERMES_MORNING_CEO_DAILY`

Belege 2026-06-09:
- `/Users/zondrius/hermes-workspace/reports/night-loop/result-tuev-2026-06-09.md`
- `/Users/zondrius/hermes-workspace/reports/night-loop/life-builder-2026-06-09.md`
- `/Users/zondrius/hermes-workspace/reports/night-loop/life-card-2026-06-09.md`
- `/Users/zondrius/hermes-workspace/reports/night-loop/morning-ceo-2026-06-09.md`

Qualitaet:
- Result-TUEV war brauchbar: echte Lane-Scores, klarer Yellow-Befund.
- Life Builder war stark: konkrete S-Kiste-Karte statt Ideenliste.
- Morgen-CEO ist technisch da, aber inhaltlich noch zu generisch. Er haette die S-Kiste klarer als Tagesaktion nach vorne ziehen muessen.

### 2. Schule / Unterricht
Status: stark abgedeckt.

Jobs:
- `TEACHER_NEXTDAY_DAILY`
- `WOCHENPLAN_GE_SONNTAG`
- `LERNWERKSTATT_QUALITY_WEEKLY`
- `LERNWERKSTATT_GAME_LAB_WEEKLY`
- `LERNWERKSTATT_TESTPILOT_WEEKLY`
- `GE_MATERIAL_SCOUT_WEEKLY`
- `LESEWERK_QUALITY_WEEKLY`
- `VDS_GE_MONITOR_WEEKLY`
- indirekt: `HERMES_LIFE_BUILDER_NIGHTLY`

Was gut ist:
- Es gibt Morgenkarten, Wochenplaene, Materialideen, Lernwerkstatt-Qualitaetspruefung und lokale App-Prototypen.
- Datenschutzregeln sind in den Prompts deutlich.
- Fuenferfeld ist korrekt geparkt.

Was fehlt wirklich:
- Ein Unterricht-Resonanz-Loop. Hermes weiss nicht sicher, ob eine Karte im echten Unterricht geholfen hat.
- Es gibt noch keine einfache Rueckmeldeform wie: `hat funktioniert / war zu lang / Material fehlte / Kinderzugang war ...`.
- Ohne diese Rueckmeldung kann Hermes nur aus eigenen Reports lernen, nicht aus echter Praxis.

### 3. Investment / Research
Status: stark als Sicherheits- und Research-System, schwach als persoenlicher Nutzen-Loop.

Jobs:
- `AI_STOCK_RADAR_DAILY`
- `INSTITUTIONAL_SELL_PRESSURE_DAILY`
- `STOCK_RISK_COMMANDER_DAILY`
- `AI_STOCK_DEEPDIVE_WEEKLY`

Was gut ist:
- Research-only, keine Trading-Aktionen.
- Harte Gates gegen Hype, name-only AI, Dilution, Delisting, Cash-Runway.
- 2026-06-09 lief der Stock-Stack.

Was fehlt wirklich:
- Der Datenengpass `free_price_data_unavailable` bleibt zentral.
- Telegram-/Reportmenge ist hoch.
- Der persoenliche Nutzen ist noch nicht: "Welche eine Research-Frage ist heute sinnvoll?", sondern oft noch breite Boards.

Beste Richtung:
- Nicht mehr Stock-Jobs.
- Eher Commander als einzige sichtbare Telegram-Sicht nutzen; Radar/Sell-Reports lokal lassen.
- Optional spaeter: ein kostenloser, sauberer Preis-/Volumenpfad oder bewusstes Parken dieses Anspruchs.

### 4. Nayyal / Hub
Status: strategisch gut abgedeckt, Umsetzung noch offen.

Job:
- `NAYYAL_HUB_RADAR_DAILY`

Belege:
- `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-hub-radar-2026-06-09.md`
- `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-09.md`

Was gut ist:
- Public/Research/Private-Grenze ist jetzt klarer.
- Public site wurde ohne Login geprueft.
- Lokale Route-Map wurde als Quelle genutzt.

Was fehlt wirklich:
- Kein echtes Nayyal Proof Board.
- Keine Connector Registry.
- Keine Umsetzung auf der Site, weil Chris zuerst entscheiden muss, ob ein sichtbarer Public/Research/Private-Satz auf `Nayyal Nexus` erlaubt ist.

Beste Richtung:
- Erst Chris-Entscheidung zur sichtbaren Hub-Legende.
- Danach ein lokaler Codex-Slice: Connector Registry oder Proof Board.

### 5. Night Apps / lokale Tools
Status: gut, aber Rueckmeldung fehlt.

Job:
- `NIGHT_APP_STUDIO_BUILD_DAILY`

Beleg 2026-06-09:
- `/Users/zondrius/hermes-workspace/reports/night-app-studio/night-app-studio-2026-06-09.md`
- Prototyp: `/Users/zondrius/hermes-workspace/projects/night-lab/2026-06-09-s-kisten-starter/index.html`

Was gut ist:
- Score 9/10.
- Screenshot/Flow vorhanden.
- Lokaler Prototyp, keine externen Dienste.
- Konkreter Testbefehl.

Was fehlt wirklich:
- Keep/Kill-Gedaechtnis nach echter Nutzung.
- Hermes weiss noch nicht, ob Chris die App wirklich in 60 Sekunden als nuetzlich empfindet.
- Ohne diese Rueckmeldung kann Night App Studio jeden Tag etwas bauen, aber nicht sicher lernen, was bleiben soll.

### 6. Control / Handoff / Hygiene
Status: stark.

Jobs:
- `HERMES_CONTROL_DAILY`
- `CODEX_HANDOFF_SCOUT_DAILY`
- `HERMES_HANDOFF_JANITOR_DAILY`

Was gut ist:
- Queue-Guard vorhanden.
- Handoff-Janitor vorhanden.
- Decision Inbox ist Standard.
- Control kann Job-Hygiene und Doppelungen beobachten.

Was fehlt wirklich:
- Control sollte neue Fehler staerker eskalieren, z. B. `BUSINESS_IDEA_FIREWORK_DAILY` Broken Pipe am 2026-06-09.
- Es braucht eine klare Regel: Fehler eines Ideenjobs entweder fixen, auf lokal stellen, auf weniger Frequenz setzen oder pausieren.

### 7. Admin / Alltag
Status: teilweise da.

Jobs:
- `ADMIN_FREITAG_30MIN`
- `HERMES_LIFE_BUILDER_NIGHTLY`
- `HERMES_MORNING_CEO_DAILY`

Was gut ist:
- Life Builder kann eine konkrete Alltagsentlastung erstellen.
- Admin-Freitag sortiert groessere Buckets.

Was fehlt wirklich:
- Wochenkraft-Loop: Was gibt diese Woche Energie, was zieht Energie, was soll Hermes nachts priorisieren?
- Der Morgen-CEO ist noch kein echter Wochenkraft-Kompass, sondern ein Tagesbericht.

### 8. Lebensarchiv / Langzeitgedaechtnis
Status: minimal da, aber kein echter Lebensarchiv-Loop.

Job:
- `HERMES_MEMORY_CURATOR_MONTHLY`

Was gut ist:
- Memory-Wildwuchs wird monatlich kontrolliert.

Was fehlt wirklich:
- Ein Wochenarchiv fuer "jetzt / spaeter / parken / public".
- Ein Ort, an dem gute Ideen aus Schule, Nayyal, Night Apps, Investment und Alltag in eine nutzbare Landkarte wandern.
- Die monatliche Memory-Kur ist zu grob fuer alltaegliche Projektspur.

## Aktuelle Fehler / Risiken

### Fehler 1: `BUSINESS_IDEA_FIREWORK_DAILY`
- Status 2026-06-09: error
- Fehler: `RuntimeError: [Errno 32] Broken pipe`
- Kein Report fuer 2026-06-09 sichtbar.
- Bedeutung: Dieser Job ist aktuell nicht verlaesslich.
- Empfehlung: Nicht ausbauen. Entweder reparieren und stark kuerzen oder auf 2-3x/Woche reduzieren.

### Fehler 2: `ADMIN_FREITAG_30MIN`
- Letzter Lauf 2026-06-05: Ergebnisfehler durch Telegram Delivery.
- Bedeutung: Inhalt kann gelaufen sein, Versand war kaputt.
- Empfehlung: Control soll Delivery-Fehler separat von Job-Qualitaet ausweisen.

### Fehler 3: `AI_STOCK_DEEPDIVE_WEEKLY`
- Letzter Lauf ok, aber Delivery-Fehler.
- Empfehlung: Wie oben, Delivery separat betrachten.

### Risiko 4: Morgen-CEO zu generisch
- Life Builder: konkrete S-Kiste-Karte.
- Morgen-CEO: generische 5-Minuten-Tagesklarheit.
- Das ist der wichtigste Loop-Bruch.
- Empfehlung: Morgen-CEO muss zuerst `Life Move of the Night` und `Chris 5-Minuten-Befehl` uebernehmen, bevor er allgemein zusammenfasst.

### Risiko 5: S-Kiste-Doppelung
- Life Card und Night App greifen beide S-Kiste auf.
- Kurzfristig gut, aber nicht jeden Tag dieselbe Spur.
- Empfehlung: Morgen pruefen, ob echter Nutzentest vorliegt. Ohne Test keine V2.

## Loop-Matrix

| Loop-Idee | Schon da? | Reife | Was fehlt wirklich? |
|---|---|---:|---|
| Ergebnis-TUEV | ja | 8/10 | nach 3-5 Tagen Kalibrierung gegen echte Nutzungsrueckmeldung |
| Morgen-CEO | ja | 5/10 | Life-Move priorisieren, weniger generisch, keine langen Arbeitsnotizen im Morgenwert |
| Life Builder | ja | 8/10 | Rueckmeldung, ob die Karte wirklich geholfen hat |
| Unterricht-Resonanz | teilweise | 5/10 | einfacher Feedback-Eingang nach Nutzung |
| Investment-Ideen | teilweise | 6/10 | weniger Breite, eine Research-Frage, Datenluecke klaeren |
| Nayyal Proof | teilweise | 5/10 | Proof Board / Connector Registry / Chris-Entscheidung |
| App-zu-Nutzen | teilweise | 6/10 | Keep/Kill-Ledger nach 60-Sekunden-Test |
| Entscheidungs-Schleuse | teilweise | 6/10 | eigener Gate-Loop fuer groessere Entscheidungen |
| Admin-Entlastung | teilweise | 5/10 | Wochenkraft-Loop statt nur Freitag/Admin |
| Lebensarchiv | kaum | 3/10 | Wochenarchiv fuer jetzt/spaeter/parken/public |

## Was nicht fehlt
- Kein weiterer App-Ideenjob.
- Kein weiterer Stock-Scanner.
- Kein weiterer Nayyal-Strategiejob.
- Kein weiterer allgemeiner Hermes-Controljob.
- Kein weiterer Tool-Scout.

## Beste naechste Schritte
1. Morgen-CEO scharfstellen: Life Move und konkrete Karte muessen vorne stehen.
2. Business Idea Firework reparieren oder reduzieren; aktuell ist er fehlerhaft.
3. Ein Feedback-Inbox-Muster einfuehren: Chris kann 1 Zeile rueckmelden, Hermes lernt daraus.
4. Danach erst Nayyal Proof Board / Connector Registry bauen.
5. Danach Wochenkraft-Loop als Wochen-Dach.

## Decision Inbox
- Signal: Yellow-Green
- SOFORT_MACHEN: Morgen-CEO-Prompt so schaerfen, dass `Life Move of the Night` und `Chris 5-Minuten-Befehl` aus dem Life Builder direkt in die Morgenmeldung uebernommen werden.
- CHRIS_ENTSCHEIDET: Ob zuerst Feedback-Inbox, Nayyal Proof Board oder Wochenkraft-Loop umgesetzt werden soll.
- BEOBACHTEN: Business Idea Firework Broken Pipe; Stock-Report-Breite; S-Kiste-Wiederholung ohne echten Nutzentest.
- SPAETER: Lebensarchiv als Wochenarchiv `jetzt / spaeter / parken / public`.
- BLOCKIERT: Echte Resonanz bleibt blockiert, solange Chris keine kurze Rueckmeldung geben kann oder will.
- NICHT_TUN: Keine neuen breiten Nachtjobs, keine weiteren Stock-Scanner, keine App-V2 ohne Nutzentest.
- Naechste kleinste Aktion: Morgen-CEO scharfstellen oder Feedback-Inbox als naechsten Execute-Slice planen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-life-loop-gap-audit-2026-06-09.md`
