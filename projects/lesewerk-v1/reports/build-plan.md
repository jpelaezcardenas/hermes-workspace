# LeseWerk V1 – Build-Plan

Stand: 2026-05-16
Status: initialer Spec-Driven Plan

## 1. Ziel

LeseWerk V1 wird als eigenständige lokale Web-App unter folgendem Pfad aufgebaut:

`/Users/zondrius/hermes-workspace/projects/lesewerk-v1`

Die App darf nicht aus dem bestehenden GE-Lernwerkstatt-Projekt importieren, davon abhängen oder dessen Code kopieren.

## 2. Arbeitsmodus

Spec-driven small slices:
1. erst Produkt-Spec und Benchmark;
2. dann eine kleine App-Grundlage;
3. dann ein geprüfter Kinderpfad und Lehrerpfad;
4. nach jedem Slice Build, lokaler Check, kurzer Report.

Maximal 3 Worker gleichzeitig:
- `schule`: Lesedidaktik, GE-Fit, Sprache und Unterstützung;
- `coder`: App-Fundament, UI, Build, lokale Verifikation;
- `neva`: Integration, Risiko, Handoff und nächste Slices.

## 3. Nicht anfassen

Nicht ändern:
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt`

Nicht speichern:
- Passwörter;
- echte Schülerdaten;
- Diagnosen;
- geschützte Assets;
- Zugangsdaten;
- personenbezogene Profile.

## 4. Vorgeschlagene technische Basis

Empfohlen:
- Vite + React + TypeScript;
- einfache lokale CSS-Struktur;
- localStorage nur für anonymes Demo-Profil;
- keine Backend-Abhängigkeit;
- keine Cloud;
- keine Authentifizierung;
- keine externen Bildassets in V1-Prototyp, nur Platzhalterflächen.

## 5. Erste Welle Kanban-Aufgaben

### Aufgabe 1: Product spec and V3 benchmark report
Assignee: `schule` oder `research`

Ziel:
- Produkt-Spec didaktisch prüfen;
- V3-Benchmark nach Passwortfreigabe ergänzen;
- GE-/Lesedidaktik-Risiken markieren.

Akzeptanz:
- `reports/product-spec.md` fachlich kommentiert oder ergänzt;
- `reports/v3-benchmark.md` entweder mit Beobachtungen ergänzt oder klar weiter blockiert mit `needs_password_for_v3_benchmark`;
- keine Credentials gespeichert.

### Aufgabe 2: App foundation and first diagnostic/syllable demo
Assignee: `coder`

Ziel:
- eigenständige lokale App aufsetzen;
- Startscreen, diagnostischer Einstieg, Silbenlesen-Demo, Supportpanel und Lehrerzusammenfassung implementieren.

Akzeptanz:
- `npm run build` erfolgreich;
- lokale Startanleitung vorhanden;
- ein Kinderpfad und ein Lehrerpfad testbar;
- keine Abhängigkeit zu `ge-lernwerkstatt`;
- deutscher UI-Text;
- Datenschutzregeln eingehalten.

### Aufgabe 3: Review, verification, and next-slice plan
Assignee: `neva` oder Reviewer

Ziel:
- App und Reports prüfen;
- Build öffnen/testen;
- nächste kleinste Slices festlegen.

Akzeptanz:
- Review-Report mit Build-Ergebnis, Kinderpfad, Lehrerpfad, GE-/Datenschutzcheck;
- klare Entscheidung: weiterbauen, korrigieren oder stoppen;
- maximal 3 nächste Slices.

## 6. Verifikationscheckliste pro Implementation-Slice

- Build läuft.
- App öffnet lokal.
- Ein echter Kinderpfad wurde geklickt.
- Lehrerpfad wurde geprüft, falls betroffen.
- UI wirkt nicht wie Admin-Dashboard.
- Sprache ist Deutsch, einfach, wertschätzend.
- Keine Noten, Rankings, Zeitdruck, Diagnosen oder Schamfeedback.
- Keine echten Namen oder personenbezogenen Daten.
- Kein Import aus GE-Lernwerkstatt.
- Kurzer Report geschrieben.

## 7. Erste konkrete Umsetzungsempfehlung

Nach Phase 0 soll der Coder-Slice nur den kleinsten vertikalen Pfad bauen:

1. Start: „Willkommen im LeseWerk“;
2. Profilwahl: „Profil Blau“, „Profil Grün“, „Profil Sonne“;
3. Diagnostischer Einstieg: „Was hilft dir beim Lesen?“;
4. Silbenkarte: z. B. „Ma-ma“, „So-fa“, „La-ma“ mit wechselnden Silbenfarben;
5. Hilfen: Bildhilfe, Silbenfarben, Vorlesen, Gebärden-Hinweis, Weniger Auswahl, Nochmal;
6. Lehrkraft: neutrales Leseprofil und nächster Schritt.

## 8. Risiken

- Benchmark kann ohne Passwort nicht vollständig ausgewertet werden.
- Produktanspruch ist groß; Implementation muss in kleinen Slices bleiben.
- Lesedidaktische Qualität braucht echte fachliche Prüfung und später Pilotfeedback.
- Symbol-/Bildrechte müssen vor Pilot/Sellable-Phase geklärt werden.
- Lokale Speicherung darf nicht versehentlich personenbezogene Daten fördern.

## 9. Nächster kleinster Prompt

„Baue in `/Users/zondrius/hermes-workspace/projects/lesewerk-v1` eine eigenständige Vite/React-App mit Startscreen, anonymem Profil, diagnostischem Einstieg, Silbenlesen-Demo, Supportpanel und Lehrerzusammenfassung. Keine Verbindung zur GE-Lernwerkstatt. Danach `npm run build` ausführen und einen kurzen Slice-Report schreiben.“
