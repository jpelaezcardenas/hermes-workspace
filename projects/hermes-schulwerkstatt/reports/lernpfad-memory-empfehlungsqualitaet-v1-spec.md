# Spec: Lernpfad-Memory Empfehlungsqualität v1

**Status:** Draft
**Ziel:** CEO-Slice zur Verbesserung der pädagogischen Präzision und Nutzbarkeit der Aufgabenempfehlungen in der "Lernpfad-Memory Aufgabenbrücke".

## 1. Pädagogische Mikrostruktur der Empfehlungen

Jede Empfehlungskarte im Memory-Panel wird um vier spezifische Felder erweitert, um den Transfer von der Beobachtung zur Handlung zu erleichtern.

### A. Dynamische Begründung (`whyFits`)
Statt statischer Texte wie "Bereich passt" wird eine "Passt, weil..." Logik implementiert:
- **Bereichs-Match:** "Unterstützt den Bereich [Bereich], da die Anforderungshöhe gut zu deiner gewählten Unterstützung passt."
- **Inhalts-Match:** "Nutzt direkt deine eingetragenen Anker ([Anker]), um an Bekanntes anzuknüpfen."
- **Einstiegs-Match:** "Bietet einen ruhigen Einstieg ohne Überlastung, ideal für die nächste Einheit."

### B. Klare Aktions-Label (`actionLabel`)
Jede Empfehlung erhält einen prioritären nächsten Schritt:
- **'Heute starten'**: Für basal/kurze Impulse (Dauer < 5 Min).
- **'Wiederholen'**: Wenn Anker-Übereinstimmung hoch ist (Sicherung des Bekannten).
- **'Als Druckkarte'**: Für Material-lastige Aufgaben (z.B. LeseWerk-Karten).

### C. Beobachtungs-Impuls (`observationHint`)
Ein konkreter Fokus für die Lehrkraft während der Durchführung:
- "Achte darauf: Verweilt der Blick kurz auf dem Material oder schweift er sofort ab?"
- "Achte darauf: Wird die Hilfe 'Hand dabei' noch voll benötigt oder reicht ein kurzer Antipp-Impuls?"

### D. Überlastungsschutz (`overloadGuard`)
Sofort-Strategie zur Komplexitätsreduktion (Overload-Guard):
- "Zu viel? Decke zwei von drei Karten ab und biete nur die sicherste Wahl an."
- "Zu viel? Reduziere auf rein visuelle Impulse ohne sprachliche Aufforderung."

---

## 2. Fachspezifische Schärfung (Beispiele)

### Bereich: Lesen (M, A Fokus)
Empfehlungen für die Buchstaben M und A sollen die "Wort/Bild/Satz-Leiter" abbilden:
1. **Stufe: Silbe** (M-a) -> "Hör Ma. Zeig Ma."
2. **Stufe: Wort** (Mama/Oma) -> "Lege Mama zu Mama." (Wort-Bild-Abgleich)
3. **Stufe: Bild-Satz** -> "Mama ist da." (Erkennen der bekannten Wörter im Kontext)

**Wording-Vorgabe:** "Bekannte Buchstaben/Silben ([L]) erkannt -> Wir festigen diese im Wort [Wort]."

### Bereich: Mengen (Mengen + Hand dabei)
Empfehlungen bei hoher Unterstützungsform ("Hand dabei"):
- Fokus auf **basale Mengenerfassung** (bis 3).
- **Material-Wording:** "Handführung nutzen, um den Mengenraum 1-3 taktil zu spüren."
- **Non-Defizit:** "Nutzt die Sicherheit der körpernahen Führung, um gemeinsam Menge zu erleben."

---

## 3. Akzeptanzkriterien für die Umsetzung

| Feature | Kriterium | Beispiel (Lesen M,A) |
| :--- | :--- | :--- |
| **Reason Text** | Enthält "weil" und konkreten Bezug. | "Passt, weil M und A enthalten sind." |
| **Action Label** | Ein Label pro Karte sichtbar. | [Heute starten] |
| **Observation** | Schlägt einen Beobachtungsfokus vor. | "Achte auf: Mundbild-Nachahmung bei M." |
| **Overload** | Bietet Reduktion an. | "Nur ein Wort zeigen." |
| **GE-Phrasing** | Keine Fehlerorientierung. | "Gemeinsam entdecken" statt "Kann noch nicht" |

---

## 4. Implementierungshinweise für `index.html`

- Die Funktion `getRecommendedTasksForMemory` muss die neuen Felder (`actionLabel`, `observationHint`, `overloadGuard`) in das Objekt-Mapping aufnehmen.
- Die UI in `renderMemoryRecommendations` muss diese Felder (ruhig und dezent) in der `recommendation-card-mini` rendern.
- Die Logik für `readingLibrary` Empfehlungen muss spezifisch auf die "Leiter"-Struktur (Buchstabe -> Silbe -> Wort) prüfen.

---
*Erstellt durch Hermes Agent (Profil: Schule)*
