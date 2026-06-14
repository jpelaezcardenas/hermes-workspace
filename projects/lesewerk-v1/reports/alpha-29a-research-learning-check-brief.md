# Alpha 29A Research Brief: Reading Diagnostic Without Diagnostic Claims

## Executive Summary
Der "LeseWerk Lernstand-Check" ist kein Test, sondern ein **formatives Beobachtungsinstrument**. Er dient dazu, innerhalb der App-Logik einen produktiven Startpunkt zu finden, indem Interaktionssignale an didaktischen Markern beobachtet werden. 

- **Ansatz**: Adaptives Sampling von Aufgaben über verschiedene kognitive und Schriftspracherwerbs-Schichten.
- **Datenschutz**: Rein lokal, anonym, keine dauerhaften Scores.
- **Sicherheits-Ziel**: "Den nächsten kleinen Schritt finden" statt "Einstufung in eine Klassenstufen-Norm".

---

## 1. Safe Observation Dimensions (Beobachtbare Dimensionen)

Im GE-Kontext beobachten wir die *Interaktionsqualität* auf diesen Ebenen:

| Dimension | Beobachtbares Signal | Sicherer UI-Label |
| :--- | :--- | :--- |
| **Symbolischer Zugang** | Kann Bild/Konzept dem visuellen Token zuordnen? | *Bild-Symbol-Bezug* |
| **Phonol. Bewusstheit (weit)** | Erkennt Rhythmus/Silben im Fokuswort? | *Rhythmus & Silben* |
| **Phonol. Bewusstheit (eng)** | Erkennt den Anlaut (Hören)? | *Anlaute hören* |
| **Graphemwissen** | Ordnet Laut dem Buchstaben-Shape zu? | *Buchstaben kennen* |
| **Silbenlesen** | Verschleift zwei Grapheme (M-A)? | *Silben verschleifen* |
| **Worterkennung** | Erkennt Ganzwörter (Lama, Mama)? | *Wörter erkennen* |
| **Satz-/Textverständnis** | Beantwortet einfache "Was/Wo"-Frage zum Lesetext? | *Sinn-Entnahme* |
| **Schreibbrücke** | Wählt Anlaut oder "schreibt" (legt) das Wort nach Vorlage? | *Schreib-Anschluss* |

---

## 2. Unsafe Claims to Avoid (Was wir NICHT behaupten dürfen)

Um rechtlich und ethisch im sicheren Bereich (nicht-klinisch) zu bleiben, darf die App folgende Begriffe **nicht** verwenden:

- **Normierte Scores**: Keine Prozentränge oder IQ-Bezüge.
- **Lesealter**: "Lesealter 6 Jahre" ist untersagt.
- **Klassenstufen**: "Klassenstufe 2" ist untersagt.
- **Klinische Diagnosen**: Begriffe wie "Legasthenie", "LRS" oder "Lernstörung" vermeiden.
- **Finalität**: Vermeidung von "Gelernt" oder "Beherrscht". Nutze "In aktueller Sitzung beobachtet".

---

## 3. Transformation: Beobachtung zu Empfehlung

Die Logik folgt dem Prinzip der "Zone der nächsten Entwicklung":

1.  **Lower Bound Start**: Biete einen bekannten Anker an (z.B. Bild-Wort-Zuordnung).
2.  **Success Trigger**: Wenn 3/3 Aufgaben ohne `reduceChoices` gelöst werden => schlage eine Ebene höher vor (z.B. von Wort zu Satz).
3.  **Help Trigger**: Wenn häufig `repeat` oder `imageHelp` genutzt wird => empfehle Verbleib auf aktueller Ebene mit "Starker Bild-Unterstützung".
4.  **The "Bridge"**: Wenn Phonol. Bewusstheit hoch, aber Lesetempo niedrig => schlage "Anlaut-Fokus" vor, um die Synthese zu stützen.

---

## 4. Empfohlener Helper / Daten-Shape

```javascript
// Strukturvorschlag für lesewerk-content.mjs (Logik-Layer)

const learningCheckObservation = {
  sessionStatus: 'active | completed',
  signals: {
    symbolicMatch: 0, // Anzahl Erfolge
    phonemeAwareness: 0,
    decodingSyllables: 0,
    comprehension: 0
  },
  adaptiveConstraint: {
    maxLevel: 'word', // Temporäres Limit basierend auf Sitzung
    recommendedSupports: ['syllableColors', 'imageHelp']
  }
};

/**
 * Verknüpft Signale mit den vorhandenen profileBuilderOptions
 */
function deriveProfileFromSignals(signals) {
  // Logik: falls signals.decodingSyllables > 2 => Schwerpunkt: 'alphabetisch'
  // sonst => Schwerpunkt: 'symbolisch/ganzwort'
}
```

---

## 5. Sichere Wording-Alternativen (German UI)

| Statt... | Nutze lieber... |
| :--- | :--- |
| **Test / Diagnose** | *Lernstand-Check*, *Gemeinsamer Start*, *Blick in den Pfad* |
| **Score / Ergebnis** | *Aktuelle Beobachtung*, *Gefundene Schwerpunkte* |
| **Nicht bestanden** | *Noch unsicher*, *Braucht mehr Hilfe* |
| **Bestanden** | *Sicher beobachtet*, *Bereit für den nächsten Schritt* |

---

## 6. Empfohlene Testfälle für Alpha 29B

- **Case A (Symbol-Fokus)**: User scheitert an Silben-Synthese, matcht aber Bilder perfekt.
    - *Ergebnis*: Empfehlung bleibt auf Stufe 1-2 mit "Schwerpunkt: Bild/Ganzwort".
- **Case B (Schneller Decoder)**: User löst 3 Wort-Lese-Aufgaben ohne Hilfe.
    - *Ergebnis*: Empfehlung schlägt "Satz-Ebene" und "Schreib-Brücke" vor.
- **Case C (Hilfe-intensiv)**: User löst Aufgaben nur mit `reduceChoices`.
    - *Ergebnis*: Empfehlung schlägt Profil "Grün" (mit Hilfe) und "Ruhiger Start" vor.

---

## Implementation Advice

1.  **Lehrkraftgeführter Start**: Der Lernstand-Check sollte im Lehrerbereich gestartet werden können, um Frustration beim Kind (durch "Test-Gefühl") zu vermeiden.
2.  **Keine Persistenz**: Die Check-Ergebnisse nicht dauerhaft speichern, es sei denn, die Lehrkraft bestätigt das daraus resultierende Profil explizit.
3.  **Transparenz**: Nutze den `safetyNote` aus Alpha 28 prominent: "Dies ist eine didaktische Orientierungshilfe, keine medizinische oder psychologische Diagnose."
