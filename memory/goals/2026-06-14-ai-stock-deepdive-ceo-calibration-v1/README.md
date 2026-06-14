# Goal: AI Stock Deepdive CEO Calibration v1

## Ziel

`AI_STOCK_DEEPDIVE_WEEKLY` soll nicht mehr so tun, als muesse immer ein Kandidat manuell geprueft werden. Der Job soll als CEO-Kalibrierung arbeiten: Pipeline sauber? Investment-Research stark? Lernen vorhanden? Daten-/Label-Audit noetig?

## Umsetzung

- Job-Prompt in `jobs.json` geschaerft.
- Wochen-Prompt-Vorlage `projects/ai-stock-radar/prompts/weekly.md` nachgezogen.
- Hermes-Jobs-Overview aktualisiert.
- Kontrollscript `hermes_stock_deepdive_ceo_calibration_check.py` erstellt.
- Setup-Bericht geschrieben.

## Erfolgskriterien

- Der Deepdive trennt `Pipeline Signal`, `Investment Signal` und `Learning Signal`.
- Bei `Shadow Backtest assessed = 0` gibt es keine Outcome-basierte Scoring-Aenderung.
- Ohne S-/A-/Deep-Dive-Kandidat gibt es keine schwache X-Kandidaten-Pruefung als Hauptaktion.
- Bei auffaelligen Labels wird genau ein `Data / Label Audit` bevorzugt.
- Decision Inbox bleibt research-only und frei von Trading-Aktionen.
