# Github Rising 2026-05-13: sichere lokale Integrationsspuren

Ziel dieses Ordners: vorbereitende Runbooks und Manifeste für spätere Sandbox-Tests der vier Kandidaten ohne produktive Installation.

Kandidaten:
- local-deep-research
- react-doctor
- DeepSeek-TUI
- PageIndex

Nicht-Ziele:
- keine Repo-Installation in diesem Arbeitsschritt
- keine API-Keys, Tokens oder echte Credentials
- keine privaten Daten, keine Schülerdaten, keine produktiven Hermes-Änderungen
- keine globalen Paketinstallationen

Sicherheitsgrundsätze:
- alle späteren Tests nur in isolierten Unterordnern unter `sandbox/`
- nur öffentliche oder synthetische Testdaten aus `synthetic-data/`
- Services nur an `127.0.0.1` binden, nicht an `0.0.0.0`
- Netzwerkzugriff nur für explizit erlaubte, manuell geprüfte Schritte
- bei jeder Auffälligkeit nach den Abbruchregeln stoppen

Struktur:
- `manifests/candidates.yaml`: Kandidaten-Matrix, Ports, Daten- und Sicherheitsvorgaben
- `runbooks/*.md`: nicht ausgeführte Schrittfolgen für spätere Sandbox-Tests
- `checks/preflight-checklist.md`: allgemeine Vorabprüfungen
- `checks/abort-rules.md`: harte Abbruchregeln
- `synthetic-data/README.md`: Vorgaben für synthetische Testdaten
- `sandbox/.gitkeep`: reservierter leerer Zielbereich für spätere Wegwerf-Tests
