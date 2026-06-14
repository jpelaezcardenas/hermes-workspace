# Productklarheit v1 - 01 Fach/UX-Spec: Schulwerkstatt x LeseWerk

Datum: 2026-05-31
Status: Final Draft
Target: Schulwerkstatt x LeseWerk Integration (v1)

## 1. Teacher First-Screen Route (Die ersten 30 Sekunden)

Damit die Lehrkraft sofort Orientierung findet, muss die Schulwerkstatt (Cockpit) folgende Route visualisieren:

1. **Startpunkt (0s):** Lehrer-Cockpit `index.html`.
2. **Profil-Check (5s):** Auswahl eines (anonymisierten) Schülerprofils oder Farbcodes (z.B. "Profil Gelb").
3. **Modul-Fokus (10s):** Anzeige der vier Säulen:
   - **Schulwerkstatt:** "Planung & Material" (Fokus: Struktur).
   - **LeseWerk:** "Lesen & Sprache" (Fokus: Silbe/Wort/Satz).
   - **GE-Lernwerkstatt:** "Kompetenz & Beobachtung" (Fokus: pädagogische Arbeitshypothese).
   - **Spielraum:** "Üben & Spiel" (Fokus: Aufgabenmaschine).
4. **Action (20s):** Klick auf einen "Connector" (z.B. LeseWerk) öffnet das Modul mit den passenden Profil-Parametern (manuell oder via URL-Übergabe).
5. **Nächster Schritt (30s):** Auswahl einer Aufgabe aus der Aufgabenbank oder dem LeseWerk-Tagespfad.

## 2. Modul-Rollen im Ökosystem

| Modul | Primäre Rolle | Output |
| :--- | :--- | :--- |
| **Schulwerkstatt** | Zentraler Anker / Cockpit | Wochenplan, Materialliste, Aufgabenkarten |
| **LeseWerk** | Premium-Leseexperte | Kinder-Lernpfad (Bild-Silbe-Wort-Satz) |
| **GE-Lernwerkstatt** | Dokumentations-Tool | Kompetenzraster, anonymisierte Beobachtungen |
| **Spielraum Generator** | Aufgaben-Werkstatt | Interaktive Übungen (Mengen, Wahrnehmung) |

## 3. Safe GE Wording (Sprachleitfaden)

Die Wortwahl in kindnahen Bereichen muss motivierend, druckfrei und fachlich präzise bzgl. GE-Bedarfen sein.

### Erlaubt (ALLOWED)
- "Nächster kleiner Schritt" (statt Fortschritt).
- "Ausprobieren" (statt Test).
- "Hilfe anzeigen" (statt Fehlerkorrektur).
- "Beobachtung" (statt Bewertung).
- "Unterstützungsniveau" (statt Defizit).
- "Arbeitshypothese" (statt Diagnose).

### Zu vermeiden (AVOID)
- Score, Punkte, Highscore, Ranking.
- Zeitdruck (keine sichtbaren Timer/Countdowns für Kinder).
- Schulnoten (1-6).
- "Fehlversuche", "falsch", "nicht bestanden".
- Stigmata oder diagnostische Label im Schüler-Interface.

## 4. Akzeptanzkriterien: Schulwerkstatt Code-Slice

Ziel: Sichtbarkeit der Modul-Rollen im Haupt-Cockpit erhöhen.

- [ ] Das Cockpit zeigt eine "Produkt-Map" oder klare Modul-Karten.
- [ ] Jede Karte benennt die Rolle (siehe Punkt 2).
- [ ] Connectoren zu LeseWerk und Spielraum sind prominent (Status: available).
- [ ] Ein "Start-Here"-Guide (3 Schritte) ist auf der ersten Seite sichtbar.
- [ ] Keine neue Datenbankspeicherung; rein UI-basiert.

## 5. Akzeptanzkriterien: LeseWerk Alpha-73A Inventory-Slice

Ziel: Den 16-Wort-Alltagswortschatz für die Lehrkraft filterbar machen.

- [ ] Lehrerbereich enthält einen neuen Filter "Alpha-73A (Alltagswortschatz)".
- [ ] Filterung nach Domains: Schule, Essen/Trinken, Körper/Kleidung, Alltag.
- [ ] Klare Trennung: "Direct-to-Child" (grün) vs. "Teacher-Led/Advanced" (orange).
- [ ] Hover oder Tooltip erklärt die Komplexität (z.B. "Diphthong pf", "Cluster sch").
- [ ] Bestandsschutz: Alpha-72 (Sofa/Tisch/Teller) bleibt unberührt.
- [ ] Alle Tests (`npm test`) bleiben grün (aktuell 239/239).

## 6. Decision Inbox (Offene Entscheidungen)

1. **URL-Deep-Links:** Sollen Profile von der Schulwerkstatt via URL-Parameter an LeseWerk übergeben werden (Datenschutz/Technik)?
2. **Druck-Integration:** Sollen LeseWerk-Wortkarten direkt in den Schulwerkstatt-Materialkorb fließen?
3. **Symbolsystem:** Bleiben wir bei Text-Platzhaltern für Symbole oder wird ein spezifisches System (anonymisiert) referenziert?

---
Produziert gemäß Kanban t_51606747.
