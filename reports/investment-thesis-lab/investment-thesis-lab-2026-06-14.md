# Hermes Investment Thesis Lab - 2026-06-14

## Kurzfazit
Yellow. Die Woche hat vor allem Lernwert geliefert, aber keine belastbare Research-These fuer eine Vertiefung ohne Vorbehalt. Das klare Muster: Die Radar-Infrastruktur findet viele AI-Namen, aber Risiko- und Evidenzfilter dominieren. Beste Lernfrage ist deshalb nicht „welcher Kandidat ist spannend?“, sondern: Welche AI-These ueberlebt Primärquellen, RiskGate und Proof-Test?

## Source Sweep
- Read:
  - `/Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-deepdive-2026-06-14.md`
  - Daily AI Stock Radar reports der laufenden Woche, besonders `ai-stock-radar-2026-06-12.md`
  - Stock Risk Commander reports 2026-06-08 bis 2026-06-12
  - Institutional pressure reports 2026-06-08 bis 2026-06-12
  - `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/watchlist.json`
  - `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/paper-portfolio.json`
  - `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/false-positive-memory.json`
  - `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/alpha-memory.json`
  - `/Users/zondrius/hermes-workspace/projects/institutional-sell-radar/holder-ledger.json`
  - `/Users/zondrius/hermes-workspace/inbox/chris-feedback/proof-ledger.md`
- Not checked:
  - Keine neue externe Web-/Provider-Recherche; dieser Lab-Lauf synthetisiert nur lokale Berichte und öffentliche Quellenlabels der Engines.
  - Keine Broker-, Konto-, Steuer- oder private Finanzdaten.
- Main data gaps:
  - `free_price_data_unavailable`: Preis-/Volumen-, relative Stärke-, Liquiditäts- und Paper-Readiness-Kontext bleibt unvollständig.
  - AI-Revenue-Proof fehlt oder bleibt bei den meisten Kandidaten nicht belastbar.
  - Ownership-/Form-4-Kontext erfordert Dokumentprüfung; öffentliche Daten sind teils verzögert oder nur Kontext.
  - Proof Ledger: Investment Watch GMEX/NBIS/DUKR ist `parked`, nicht `tested_useful`.

## Weekly Signal Map
- Staerkstes Research-Muster: GMEX ist der einzige Kandidat mit Firewall `pass`, Datenqualitaet A und CEO-Lane `monitor`, bleibt aber wegen Alpha-Contradiction und fehlender Preis-/Volumen-Bestaetigung nur `WAIT_FOR_CONFIRMATION`.
- Schwaechstes/noisiestes Muster: 27 von 30 Watchlist-Kandidaten sind X; viele Treffer sind name-only AI, Listing-/Delisting-, Offering-/Dilution- oder Cash-Runway-Risiken.
- Wiederholter Blocker: Risk Overrides dominierten im Stock Risk Commander an vier Markttagen alle 30 Kandidaten; Research Attention blieb 0.
- Neue Evidenz: Weekly Deepdive bestaetigt Grade Summary S:0, A:0, B:2, C:1, X:27; Firewall pass:1, caution:13, reject:16; CEO focus:0, monitor:1, manual_review:2, reject:27.
- Nicht veraendert: Keine Deep-Dive-Huerde wurde sauber erreicht; Paper-Portfolio bleibt leer; institutionelle Warnstufe blieb ohne WARNING/CRITICAL_REVIEW.

## Thesis Cards
### 1) Red Flag Card: AI-Name ohne Substanz
- Ticker / theme: Watchlist-weites Muster, besonders name-only AI Cluster
- Thesis in one sentence: Ein AI-Bezug zaehlt erst, wenn Produkt, Kundennachweis, Filing-Kontext und Umsatzrealitaet zusammenpassen.
- Evidence: False Positive Memory zaehlt `name_only_ai_watch: 21`; Weekly Deepdive meldet 27 X-Kandidaten und keine Deep-Dive-Kandidaten.
- What would disprove it: Ein Kandidat zeigt Primärquellen mit konkretem AI-Produkt, aktuellem Kunden-/Umsatzbezug, Firewall `pass`, CEO mindestens `monitor`, und keine harten RiskGates.
- Red flags: Name-only AI, schwacher AI-Revenue-Proof, Listing-/Delisting-Risiko, Offering/Dilution, Cash-Runway-Luecken.
- Data gaps: Preis-/Volumen-Kontext unavailable; AI-Revenue-Proof fehlt haeufig; Form-4-Dokumente nicht manuell auscodiert.
- Next research question: Welcher eine Watchlist-Name kann mit Primärquelle belegen, dass AI nicht nur Narrativ, sondern Umsatz-/Kundenrealitaet ist?
- Lane: WAIT_FOR_DATA

### 2) GMEX Monitor Thesis
- Ticker / theme: GMEX / Robotics-AI
- Thesis in one sentence: GMEX ist der sauberste Monitor-Fall, aber noch kein belastbarer Vertiefungsfall.
- Evidence: Score 65, Datenqualitaet A, Firewall `pass`, CEO lane `monitor`, Quellenbreite aus Nasdaq/SEC/companyfacts; Risk Commander markiert trotzdem `RISK_REVIEW` wegen Alpha-Memory-Contradiction.
- What would disprove it: Keine konkrete AI-Umsatz-/Kundenrealitaet, neue RiskGate-Labels, Verschlechterung der Filings oder weitere Contradiction-Marker.
- Red flags: Free-source evidence needs manual review; price/volume confirmation unavailable; Alpha Memory `CONTRADICTION_REVIEW`.
- Data gaps: Keine robuste Preis-/Volumen-Bestaetigung; manuelle Primärquellenpruefung steht aus.
- Next research question: Welche konkrete GMEX-Primärquelle zeigt AI-Kunden-, Produkt- oder Umsatzsubstanz statt nur Themenexposition?
- Lane: WATCH

### 3) NBIS / DUKR Risk-Learning Pair
- Ticker / theme: NBIS und DUKR als Kontrastfaelle
- Thesis in one sentence: Hohe Datenqualitaet oder ein hoher Score reicht nicht, wenn Firewall/CEO/Alpha-Risiken dagegenstehen.
- Evidence: NBIS Grade B mit Firewall `caution`, CEO `manual_review`, Alpha `RISK_PATTERN`; DUKR Grade C mit Cash-Runway-Risiko und `TOO_RISKY` Paper-Label.
- What would disprove it: Risiko-Labels werden durch neue Primärquellen nachvollziehbar geklaert und AI-Revenue-/Kundenbezug wird belastbar.
- Red flags: Foreign issuer / limited US-GAAP facts bei NBIS; Cash-Runway-Watch bei DUKR.
- Data gaps: Keine ausreichende Bestaetigung durch Preis-/Volumen- und harte Catalyst-Daten.
- Next research question: Welcher der beiden Risikofaelle ist nur Datenluecke, und welcher ist echter Strukturfehler?
- Lane: REJECT

## Red Flag Board
- name-only AI: 21 Watchlist-Muster; blockiert Breakout-/Deep-Dive-Logik.
- dilution/offering/warrants: Offering-Watch 9, Dilution-Trend-Watch 12; bleibt vor jeder positiven These ein RiskGate.
- delisting/reverse split/going concern: Delisting-Watch 16; solche Labels dominieren jede Themenstory.
- weak cash runway: Cash-Runway-Watch 9; bei DUKR explizit sichtbar.
- missing AI revenue proof: Hauptluecke fuer fast alle Kandidaten; Produkt-AI ist nicht automatisch Umsatz-AI.
- stale catalyst: Alpha Memory markiert stale/thin oder late/risk timing; keine harte aktuelle These fuer Deep Dive.
- institutional pressure if visible: Keine WARNING/CRITICAL_REVIEW im Wochenlauf; mehrere Form-4-Kontexte bleiben nur Review-Trigger mit Datenlatenz.

## Paper Portfolio Learning
- Simulated positions: 0; `paper-portfolio.json` ist leer und research-only.
- New paper-entry candidates: none. Die Quellen unterstuetzen aktuell keine klare Paper-Entry-Review-Ausweitung.
- What would have improved last week's decisions: Frueheres Trennen von „AI-Thema vorhanden“ und „AI-Umsatz/Kundenbeweis vorhanden“ haette Rauschen reduziert.
- One rule to test next week: Kein Kandidat bekommt bessere Lab-Prioritaet, solange Preis-/Volumen-Kontext unavailable ist und zugleich AI-Revenue-Proof fehlt.

## Decision Memory
- Eine AI-Aktie ist erst eine These, wenn ein Primärquellenbeleg die AI-Substanz konkret macht.
- RiskGate gewinnt immer gegen Score, Story und Themenpassung.
- Datenqualitaet A ist nicht genug, wenn die These durch Firewall, CEO-Control oder Alpha Memory widersprochen wird.
- Form-4- oder institutionelle Kontexte sind ohne Dokumentauswertung Review-Hinweise, keine Live-Aussage.
- Ein leerer Paper-Portfolio-State ist ein gutes Stoppsignal, wenn Evidenz und Risiko nicht zusammenpassen.

## Best Next Research Question
Welche eine GMEX-Primärquelle belegt konkrete AI-Kunden-, Produkt- oder Umsatzsubstanz, und welche Quelle wuerde die These sofort entkraeften?

## Companion Card
- Written: yes
- Path: `/Users/zondrius/hermes-workspace/reports/investment-thesis-lab/thesis-card-2026-06-14.md`
- Why: Die Woche ist hauptsaechlich ein Red-Flag-/WAIT_FOR_DATA-Lernfall; eine kompakte Karte verhindert, dass AI-Namen ohne Substanz naechste Woche wieder wie frische Chancen wirken.

## Befehlskarte
- Chris 5-Minuten-Befehl: Oeffne die Companion Card und markiere genau eine GMEX-Primärquelle, die AI-Substanz belegt oder widerlegt.
- Proof-Befehl: Im Proof Ledger nach manueller Sichtung nur eine Zeile ergaenzen: `2026-06-14 | Investment | GMEX Primärquelle | tested_useful/tested_not_useful/parked | kurzer Beleg | naechster Pruefschritt`.
- Hermes-Pruefbefehl: `sed -n '1,220p' /Users/zondrius/hermes-workspace/reports/investment-thesis-lab/investment-thesis-lab-2026-06-14.md`
- Stop-/Park-Befehl: Parken, wenn keine Primärquelle AI-Umsatz, Kundenbezug oder Produktrealitaet zeigt.
- Nicht-ausfuehren: Keine Brokeraktion, keine Hebel-/Derivate- oder Echtgeld-Workflows, keine paid provider/API-Key-Setups, keine automatischen Alerts mit Finanzaktionscharakter.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob die GMEX-Primärquellenfrage manuell als 5-Minuten-Proof getestet wird; paid provider/API-Key-Setups bleiben menschliche Entscheidung.
- BEOBACHTEN: GMEX nur als Monitor-Fall; name-only AI, Offering/Dilution, Delisting und Cash-Runway-Muster als wiederkehrende Fallen.
- SPAETER: Regelkalibrierung nach mehreren Wochen pruefen, sobald Preis-/Volumen-Kontext stabiler verfuegbar ist.
- BLOCKIERT: Ohne Primärquellen-Proof und ohne Preis-/Volumen-Kontext keine sinnvolle Lab-Ausweitung.
- NICHT_TUN: Keine automatischen Finanzaktionen, keine Hype-Verfolgung, keine Deep-Dive-Erklaerung aus Score allein.
- Naechste kleinste Aktion: Companion Card lesen und entscheiden, ob GMEX-Primärquelle manuell geprueft wird.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/investment-thesis-lab/investment-thesis-lab-2026-06-14.md`
