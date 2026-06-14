# Alpha 27 Symbol- und Asset-Audit

## Sind echte METACOM-Bilder vorhanden?
Nein. Im aktuellen Stand sind keine echten METACOM-Bilder eingebettet. Es wurden auch keine Boardmaker-, Widgit-, ARASAAC- oder sonstigen geschützten Symbolsets importiert, kopiert, gescraped oder nachgebildet. Die App nutzt lokale Text-, Form- und Zeichenkarten als Platzhalter.

## Reichen die lokalen Symbolkarten für untere Lesestufen?
Teilweise. Für einen lokalen Prototypen sind sie hilfreich, weil sie Orientierung geben, ohne externe Assets oder personenbezogene Daten zu benötigen. Für den echten Unterricht sind sie aber nicht in allen Fällen ausreichend: Manche Begriffe sind mit einfachen Formen schwer eindeutig zu erkennen, und GE-Schülerinnen und -Schüler brauchen häufig vertraute, konsistente Symbolsysteme oder reale Gegenstände/Fotos aus dem Unterrichtskontext.

## Priorität für bessere Bild-/Symbolstützen
Zuerst besser unterstützen: Tasche, Fenster, Tür, Schule, Licht, Haus, Maus, Sofa, Lama, Tafel, Rose, Nase. Gründe: visuelle Ähnlichkeit, abstrakter Kontext, komplexe Grapheme oder hohe Verwechslungsgefahr in Antwortoptionen.

## Was braucht ein lizenzierter Asset-Workflow?
1. Gültige Schullizenz oder Projektlizenz für das konkrete Symbolsystem.
2. Klare Rechteprüfung: Nutzung lokal, im Unterricht, in App-Demo, in Exporten oder Veröffentlichung getrennt klären.
3. Manifest statt fest verdrahteter Dateien: die App kennt nur Slots, Alt-Texte und Fallbacks.
4. Keine Auslieferung geschützter Assets in öffentlichen Repos oder Demo-Builds.
5. Lehrkraft entscheidet, ob lokale Platzhalter, reale Gegenstände, eigene Fotos ohne Personenbezug oder lizenzierte Symbole eingesetzt werden.

## Neutrale Manifestform
```js
{
  taskId: 'b-ta-sche',
  word: 'Tasche',
  concept: 'Schultasche',
  defaultLocalCue: 'lokale Form-/Textkarte',
  licensedAssetSlot: 'licensed-b-ta-sche',
  altText: 'Symbol für Tasche, falls rechtlich vorhanden',
  usageNote: 'Nur mit gültiger Lizenz einfügen; lokale Platzhalter bleiben Fallback.'
}
```

## Ergebnis
Accepted / nicht blockiert für Alpha 27B: Kein geschütztes Asset ist eingebettet. Die aktuelle Symbolhilfe ist für Prototyping sicher, aber fachlich ehrlich als Platzhalter zu kennzeichnen.
