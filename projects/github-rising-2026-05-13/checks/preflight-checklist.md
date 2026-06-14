# Preflight-Checkliste für spätere Sandbox-Tests

Vor jedem Kandidaten-Test:

1. Arbeitsbereich bestätigen
   - `pwd` muss unter `/Users/zondrius/hermes-workspace/projects/github-rising-2026-05-13` liegen.
   - Keine Befehle in produktiven Hermes- oder Schul-/Kundendaten-Repositories ausführen.

2. Sandbox vorbereiten
   - Pro Kandidat ausschließlich `sandbox/<kandidat>/` verwenden.
   - Alte Testreste zuerst archivieren oder löschen, wenn keine Auswertung mehr benötigt wird.

3. Quellen prüfen
   - Repository-URL, Lizenz und README manuell prüfen.
   - Install-/Startskripte vor Ausführung lesen: `package.json`, `pyproject.toml`, `setup.py`, `Makefile`, `Dockerfile`, Shell-Skripte.
   - Bei unklarer Telemetrie, Postinstall-Skripten oder obfuskiertem Code abbrechen.

4. Credentials ausschließen
   - Keine echten `.env`-Dateien kopieren.
   - Keine Shell-Umgebung mit API-Keys verwenden.
   - Nur Dummy-Werte nutzen, z. B. `DUMMY_NOT_A_SECRET`.

5. Daten ausschließen
   - Keine privaten Dokumente, keine Schülerdaten, keine Chat-Historien, keine lokalen Browserprofile.
   - Nur `synthetic-data/` und explizit öffentliche Beispielquellen verwenden.

6. Netzwerk begrenzen
   - Lokale Server nur mit `--host 127.0.0.1` oder gleichwertiger Einstellung starten.
   - Keine Bindung an `0.0.0.0` oder öffentliche Interfaces.
   - Keine externen Dienste ohne vorherige Freigabe.

7. Logging begrenzen
   - Logs unter `sandbox/_logs/` speichern.
   - Keine Secrets in Logs; Logs nach Test prüfen und ggf. löschen.

8. Ergebnisdokumentation
   - Befehle, Checks, Ports, Beobachtungen und Abbrüche unter `sandbox/_reports/<kandidat>-YYYYMMDD.md` dokumentieren.
