# Abbruchregeln

Ein späterer Sandbox-Test wird sofort gestoppt, wenn eine der folgenden Bedingungen eintritt:

Harte Stopps:
- ein Tool fordert echte API-Keys, Tokens, Cloud-Credentials oder Login-Daten an
- Installationsskripte greifen auf private Registries, SSH-Keys oder globale Konfigurationen zu
- ein Service bindet an `0.0.0.0`, `::` oder ein öffentliches Interface und lässt sich nicht auf `127.0.0.1` begrenzen
- das Tool versucht, Verzeichnisse außerhalb von `sandbox/<kandidat>/` zu verändern
- private Daten, Schülerdaten, echte Chat-Historien oder Credentials werden benötigt oder versehentlich eingelesen
- Postinstall-/Startskripte enthalten unklare Downloads, Telemetrie, `curl | sh`, obfuskierten Code oder destructive Befehle
- Docker/Container fordern privilegierten Modus, Host-Netzwerk, Host-Mounts außerhalb der Sandbox oder Zugriff auf `/var/run/docker.sock`

Weiche Stopps, erst nach Klärung fortsetzen:
- Lizenzlage unklar
- erheblicher Netzwerkverkehr zu nicht dokumentierten Endpunkten
- unklare Speicherung von History, Prompts, Embeddings oder Reports
- unerwartete Schreibzugriffe in Home-Verzeichnis, globale Caches oder produktive Repos
- unklare Modell-/Daten-Downloads mit großem Umfang

Nach Abbruch:
1. Prozess beenden.
2. Logs unter `sandbox/_logs/` sichern, aber keine Secrets reproduzieren.
3. Bericht unter `sandbox/_reports/<kandidat>-abort-YYYYMMDD.md` schreiben.
4. Sandbox-Verzeichnis nicht weiterverwenden, bis Ursache geklärt ist.
