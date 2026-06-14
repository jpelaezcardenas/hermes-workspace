# LeseWerk Alpha 26A – Nous Curriculum Expansion Brief

**Kurzfazit**
* LeseWerk ist bereit für eine massive Graphem-Expansion; die Filterlogik (Alpha 22-25) steht.
* Ziel von Alpha 26B: Erweiterung der `taskRequirementProfiles` auf mindestens 24 Aufgaben.
* Fokus: Sichere Level-A (Bild-Wort) und strukturierte Level-B (Silben) Aufgaben.
* Strategie: Konservatives Tagging von Konsonant-Vokal (CV) Clustern; komplexe Auslaute und Diphthonge vorerst meiden oder explizit warnen.

---

### 1. Aktueller Stand (Ergebnisse Alpha 22-25)
Die technischen Grundlagen für ein profilgestütztes Lesen sind implementiert:
* **Graphem-Filter:** Aufgaben werden blockiert, wenn Zielgrapheme im Profil fehlen.
* **Options-Sanitizer:** Distraktoren mit unbekannten Graphenen werden ausgeblendet.
* **Modus-Labeling:** Automatische Unterscheidung zwischen `full-choice`, `reduced-choice` und `teacher-led`.
* **Lehrer-Vorschau:** Erste Sichtbarkeit der Profilwirkung ohne invasive Datenspeicherung.
* **Abdeckung:** Bisher nur 3 Pilot-Aufgaben (`b-ma-ma`, `b-so-fa`, `b-la-ma`) profiliert.

---

### 2. Expansion Target: Alpha 26B
Um eine kritische Masse für die unterrichtliche Nutzung zu erreichen, werden folgende 24 Aufgaben für das Tagging priorisiert:

**Level A (Bild-Wort-Zuordnung – Fokus: Bekannte Nomen)**
* `a-ball`, `a-bus`, `a-hut`, `a-tasse`, `a-sonne`, `a-haus`, `a-maus`, `a-licht`, `a-regen`, `a-wind`, `a-blume`, `a-tasche`, `a-fenster`, `a-tuer`, `a-buch` (15 Aufgaben)

**Level B (Silbensynthese – Fokus: CV-Strukturen)**
* `b-li-mo`, `b-to-ma-te`, `b-ba-na-ne`, `b-ro-se`, `b-na-se`, `b-ta-sche`, `b-ta-fel`, `b-schu-le`, `b-blu-me`, `b-re-gen` (10 Aufgaben)

---

### 3. Konservatives Tagging-Prinzip (German Graphemics)
Für die Expansion gilt das Prinzip der **minimalen Graphem-Einheit**:
* **Vokale:** a, e, i, o, u separat taggen.
* **Konsonanten:** Einzellaut-Konsonanten (m, n, l, r, s, f, t, b, d, k, g, p, h) separat.
* **Silben:** Nur offene CV-Silben (`ma`, `mo`, `ba`, `na`) als `knownSyllables` führen.
* **Reduktion:** Bei Wörtern wie "Limo" (Li-mo) müssen sowohl Grapheme {l, i, m, o} als auch Silben {li, mo} im Profil aktiv sein für `full-choice`.

---

### 4. Warnungen & Tricky Items
Diese Elemente erfordern in Alpha 26B besondere Aufmerksamkeit im Metadaten-Modell:
* **sch / ch:** Müssen als *ein* Zielgraphem behandelt werden (nicht s-c-h).
* **Diphthonge (au, ei, eu):** Erhöhen die Komplexität massiv; für Level B vorerst `teacher-led` priorisieren, wenn diese enthalten sind.
* **Dehnungs-ie:** Muss als Graphem-Einheit `ie` getaggt werden.
* **st / sp:** Im Anlaut als Cluster behandeln.
* **Satz-Prompts:** In Level C (z.B. `c-licht`) müssen auch die Grapheme des kurzen Satzes ("Die Lampe macht Licht") in die `optionGraphemes` aufgenommen werden, da sie den Leseerfolg beeinflussen.

---

### 5. Minimum Metadata Schema (Vorschlag)
Jeder Eintrag in `taskRequirementProfiles` benötigt:
```javascript
'task-id': {
  taskId: string,
  targetWord: string,
  targetGraphemes: string[],   // Alle im Wort enthaltenen Grapheme (z.B. ['t', 'a', 'sch', 'e'])
  targetSyllables: string[],   // Silbenzerlegung (z.B. ['ta', 'sche'])
  syllablePattern: string,     // Didaktisches Muster (z.B. 'CV-V-CV')
  minReadingStage: number,     // Default 5 für Wortebene
  optionWords: string[],       // Alle Wörter der Distraktor-Liste
  optionGraphemes: string[],   // Vereinigung aller Grapheme aus Ziel + Optionen
  qualityStatus: 'draft'|'reviewed_safe',
  controlledUseNote: string    // Hinweis für die Lehrkraft
}
```

---

### 6. Suggested Tests
Der Implementierer für 26B muss sicherstellen:
* **Graphem-Vollständigkeit:** Testet ein Wort mit `sch`, ob das Fehlen von `sch` (trotz vorhandenem `s`) die Aufgabe blockiert.
* **Option-Leakage:** Testet, ob eine Aufgabe mit Distraktor "Sonne" blockiert wird, wenn `n` im Profil fehlt, obwohl das Zielwort (z.B. "Sofa") passen würde.
* **Silben-Match:** Testet, ob `b-to-ma-te` blockiert wird, wenn nur `ma` bekannt ist, aber `to` und `te` fehlen.

---

### 7. Privacy & GE Guardrails
* **Kein Scoring:** Das System darf niemals "Richtig/Falsch"-Statistiken pro Graphem permanent speichern.
* **Keine Empfehlung:** "Das Kind sollte X üben" ist verboten. Zulässig ist nur: "Dieses Wort passt zum gewählten Fokus".
* **Anonymität:** Die Profile bleiben als `Profil Blau`, `Profil Sonne` etc. rein deskriptiv.
* **Keine Validierung:** Das Modell wird als "lokale Strukturierungshilfe" deklariert, nicht als standardisiertes Diagnose-Tool.
