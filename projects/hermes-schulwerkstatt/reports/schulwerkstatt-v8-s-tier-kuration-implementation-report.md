# Schulwerkstatt v8 - S-Tier Kuration Implementation Report

Datum: 2026-05-26

## Ergebnis

Die v8-S-Tier-Kuration wurde in der Schulwerkstatt umgesetzt. Die Aufgabenbank bleibt vollständig erhalten, wird aber jetzt ruhiger und fachlich stärker geführt: 10 besonders unterrichtsnahe Aufgaben sind als `Sofort nutzbar` markiert.

## Geänderte Datei

- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/index.html`

## Umgesetzt

- Neue ruhige Kurationselemente:
  - `curation-badge`
  - `curation-start`
  - `curation-reason`
- Neue Render-Helfer:
  - `isSofortNutzbar(task)`
  - `curationBadge(task)`
  - `curationStart(task)`
  - `curationReason(task)`
- Aufgabenkarte:
  - zeigt bei kuratierten Aufgaben ein dezentes Badge `Sofort nutzbar`
  - zeigt eine kurze Startzeile
  - zeigt im Lehrkraftbereich kurz, warum die Aufgabe empfohlen ist
- Druckkarte:
  - Kind-Seite bleibt kurz
  - Lehrkraft-Seite bekommt den Empfehlungsgrund

## Kuratierte Aufgaben

Exakt diese 10 Aufgaben wurden markiert:

- `lesen-1`
- `lesen-6`
- `mengen-1`
- `mengen-3`
- `uk-1`
- `uk-8`
- `uk-9`
- `wahr-1`
- `wahr-5`
- `wahr-6`

## Verifikation

Statische Prüfung:

- Aufgaben gesamt: 48
- Lesen: 12
- Mengen: 12
- Kommunikation/UK: 12
- Wahrnehmung/Alltag: 12
- Kuratierte Aufgaben: 10
- Fehlende erwartete Kurationen: 0
- Zusätzliche unerwartete Kurationen: 0

Visuelle Prüfung mit Chrome, mobile 390px:

- Seite lädt unter `http://127.0.0.1:8788/`
- sichtbare Aufgabenbank-Karten: 48
- sichtbare `Sofort nutzbar`-Badges: 10
- `scrollWidth`: 390
- `clientWidth`: 390
- horizontales Overflow: nein

## Nicht umgesetzt

- Kein neuer Filter, weil die Oberfläche sonst dichter würde.
- Keine neuen externen Assets.
- Keine neue Speicherung.
- Keine Schülerdaten.
- Keine Scores, Rankings oder Diagnosezahlen im Kindermodus.
- Keine LeseWerk-Deep-Link-Logik, weil diese separat und vorsichtig geplant werden sollte.

## Bewertung

Das ist ein guter v8-Schritt: Die App wird nicht größer, sondern klüger. Lehrkräfte sehen schneller, welche Aufgaben sofort tragfähig sind, ohne dass Kinder durch zusätzliche Diagnostiksprache oder Bewertung belastet werden.

## Nächste Empfehlung

Als nächstes sollte die kuratierte Sicht praktisch genutzt werden:

1. Eine echte Wochenplan-Situation mit nur 3 bis 5 `Sofort nutzbar`-Aufgaben zusammenstellen.
2. Prüfen, ob die Startzeilen in der Klasse wirklich verständlich genug sind.
3. Danach erst die kleine LeseWerk-Brücke bauen: genau ein lokaler Übergabepunkt von Schulwerkstatt zu einem passenden LeseWerk-Einstieg.
