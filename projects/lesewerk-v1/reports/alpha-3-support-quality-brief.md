# LeseWerk Alpha 3 – Support-Qualitätsbrief

Stand: 2026-05-16

## 1. Ziel des Supports in Alpha 3

Die Bildhilfe soll im LeseWerk für Lernende mit Unterstützungsbedarf nicht dekorativ sein, sondern eine echte Lesestütze. Sie muss dabei helfen, ein Wort oder eine Aufgabe schneller zu verstehen, ohne den Kinderfluss zu überladen.

Für Alpha 3 gilt:
- Bildhilfe zeigt den Sinn eines Wortes oder einer Aufgabe möglichst direkt.
- Bildhilfe unterstützt Orientierung, Auswahl und Verstehen.
- Bildhilfe bleibt ruhig, klar und kurz.
- Bildhilfe darf helfen, ohne dass das Kind lange erklärt bekommen muss, was gemeint ist.
- Bildhilfe ist eine Lernhilfe, kein Bewertungssymbol.

Geeignet ist Bildhilfe vor allem dort, wo das Wortbild allein noch nicht trägt oder wo der Einstieg ins Lesen über Verstehen und Wiedererkennen erleichtert wird.

## 2. Erlaubte lokale, rechtssichere Platzhalter für Alpha 3

Erlaubt sind nur lokale, einfache und nicht-personenbezogene Platzhalter, die ohne externe Dienste funktionieren.

Zulässig in Alpha 3:
- einfache lokale CSS-Flächen und Formen;
- Textkarten mit klarer Beschriftung;
- Emoji oder Unicode-Symbole als vorläufige Platzhalter, wenn sie nur als lokale Hilfsmarke dienen;
- neutrale Farbflächen;
- einfache Icon-ähnliche Formen aus dem eigenen Code;
- lokale SVGs, die von der App selbst erzeugt oder mitgeliefert werden und keine geschützten Vorlagen kopieren.

Wichtig:
- Platzhalter müssen als vorläufig erkennbar bleiben;
- sie dürfen nicht so wirken, als seien sie echte METACOM- oder Fremdsymbole;
- sie müssen lokal, simpel und austauschbar bleiben.

## 3. Nicht erlaubt

In Alpha 3 dürfen nicht verwendet werden:
- METACOM;
- geschützte Symbolsets oder Kopien geschützter Assets;
- externe generierte Bilder oder externe Bilddienste;
- Fotos von echten Kindern;
- Cloud-Bilder;
- personenbezogene Fotos oder echte Klassenbilder;
- importierte fremde Icons, wenn Lizenz oder Herkunft unklar ist;
- alles, was nach offizieller Symbolbibliothek aussieht, aber nicht sauber lizenziert ist.

Grundsatz: lieber einfacher lokaler Platzhalter als riskante „schöne“ Symbolkopie.

## 4. Kleine Symbol- und Icon-Taxonomie für den aktuellen Task-Pack

Für Alpha 3 reicht eine sehr kleine, klare Taxonomie. Sie soll auf den vorhandenen Aufgabenstand passen und nicht mehr versprechen, als technisch und rechtlich sicher ist.

Vorschlag für die aktuelle Taxonomie:

1. Bildhilfe
- Symbol: `◻` oder kleines lokales Rahmen-Icon
- Bedeutung: hier hilft ein Bild oder Platzhalterbild
- Einsatz: bei Aufgaben, die über Verstehen unterstützt werden sollen

2. Vorlesen / Audio
- Symbol: `♪` oder Lautsprecher-Text `Vorlesen`
- Bedeutung: hier kann Sprache vorgelesen werden oder die Lehrkraft liest
- Einsatz: bei Aufgaben mit Audiohinweis

3. Silbenhilfe
- Symbol: farbige Silbenbalken oder einfache Blau-Rot-Markierung
- Bedeutung: Silbenstruktur wird sichtbar
- Einsatz: bei Silben- und Wortlesen

4. Weniger Auswahl
- Symbol: `2` in ruhiger Karte oder zwei kleine Felder
- Bedeutung: nur zwei Optionen statt vieler
- Einsatz: wenn der Kinderfluss entlastet werden soll

5. Noch einmal
- Symbol: `↺`
- Bedeutung: wiederholen ohne Druck
- Einsatz: bei Unsicherheit oder Wunsch nach Wiederholung

6. Hilfe für die Lehrkraft
- Symbol: `i` oder `Lehrkraft`
- Bedeutung: nur für den Erwachsenenbereich, nicht für den Kinderfluss
- Einsatz: bei Beobachtung, Einordnung, nächstem Schritt

Taxonomie-Regeln:
- nicht zu viele Symbole gleichzeitig;
- immer dieselbe Bedeutung im ganzen Produkt;
- kindseitig nur die wirklich nötigen Zeichen;
- Symbole sollen unterstützend, nicht erklärungsbedürftig sein.

## 5. Entscheidungsrahmen für Vorlesen / Audio

Alpha 3 soll Vorlesen und Audio in drei klaren Stufen denken.

### Stufe 1: Nur Lehrkraft-Prompt
Wenn die App noch nicht stabil genug für Audio ist oder wenn die pädagogische Entscheidung offen bleibt, zeigt die App nur einen Hinweis für die Lehrkraft.

Einsatz:
- schnell umsetzbar;
- rechtlich und technisch am sichersten;
- gut für Alpha-Phase.

Beispiel:
- „Lehrkraft liest vor.“
- „Bei Bedarf gemeinsam sprechen.“

### Stufe 2: Lokale Browser-Speech-Synthesis-Demo
Wenn ein lokaler Demo-Schritt sinnvoll ist, kann eine Browser-Sprachausgabe als technische Machbarkeitsprobe dienen.

Bedingungen:
- nur lokal im Browser;
- keine Cloud-TTS;
- keine personenbezogenen Inhalte;
- nur kurze Standardtexte;
- leicht abschaltbar;
- immer mit Lehrkraft- oder Gerätekontext geprüft.

Diese Stufe ist nur sinnvoll, wenn die Demo wirklich hilft zu prüfen, ob Audio den Lernfluss verbessert.

### Stufe 3: Noch kein Audio
Wenn Audio den Alpha-3-Scope verkompliziert oder keine sichere Umsetzung vorliegt, bleibt Audio bewusst aus.

Das ist die bevorzugte Entscheidung, wenn:
- die Bildhilfe zuerst stabil werden muss;
- keine klare didaktische Notwendigkeit vorliegt;
- noch unklar ist, ob Kinder mehr von Audio als von ruhiger Bildhilfe profitieren;
- die Implementierung sonst die Qualität des Kinderflusses stört.

Entscheidungsregel:
- Bildhilfe vor Audio, wenn Verstehen und Orientierung das Hauptproblem sind.
- Audio nur dann vorziehen, wenn es die Lesestufe wirklich entlastet und lokal sauber umsetzbar ist.

## 6. Struktur für die Lehrer-Support-Historie

Die Lehreransicht soll nicht als freier Notizblock erscheinen, sondern als klare, beobachtbare Struktur.

Empfohlene Reihenfolge:

1. Situation
- Wann und in welchem Kontext wurde beobachtet?
- Welche Aufgabe war dran?

2. Hilfe
- Welche Unterstützung wurde angeboten oder gewählt?
- z. B. Bildhilfe, Silbenfarben, reduzierte Auswahl, Vorlesen, Wiederholung

3. Handlung
- Was hat die lernende Person konkret getan?
- Nur beobachtbar beschreiben.

4. Beobachtung
- Welche fachlich vorsichtige Einordnung ist möglich?
- Ohne Diagnose, ohne endgültige Bewertung.

5. Nächster Schritt
- Was ist der kleinste sinnvolle nächste Lernschritt?
- Möglichst konkret, alltagsnah und realistisch.

Beispielstruktur:
- Situation: „Bei der Aufgabe mit Bild- und Wortauswahl“
- Hilfe: „Bildhilfe und reduzierte Auswahl“
- Handlung: „das passende Wort ausgewählt“
- Beobachtung: „mit visueller Struktur sicherer“
- Nächster Schritt: „ähnliche Wörter mit zwei Optionen wiederholen“

## 7. Qualitätsrahmen für die Coder-Slices

Die nächsten Coder-Slices sollen sich an klaren Akzeptanzkriterien messen lassen.

### Slice A – lokale Bildhilfe
Akzeptanzkriterien:
- Bildhilfe ist im Kinderfluss sichtbar und funktional;
- es werden nur lokale, rechtssichere Platzhalter genutzt;
- keine METACOM- oder Fremdassets;
- keine Fotos, keine Cloud-Bilder;
- die Bildhilfe unterstützt eine Aufgabe wirklich, statt nur Dekoration zu sein;
- kindliche Texte bleiben kurz, ruhig und konkret.

### Slice B – Vorlesen / Audio
Akzeptanzkriterien:
- die App trifft eine klare Entscheidung zwischen Lehrkraft-Prompt, lokaler Browser-Demo oder keinem Audio;
- keine Cloud-Audiofunktion;
- keine personenbezogenen Inhalte im Audio;
- die Audio-Variante darf den Kinderfluss nicht stören;
- wenn Audio fehlt, ist das bewusst und begründet dokumentiert.

### Slice C – Lehrer-Support-Historie
Akzeptanzkriterien:
- Lehrerbereich ist in die Reihenfolge Situation -> Hilfe -> Handlung -> Beobachtung -> nächster Schritt gegliedert;
- die Formulierungen sind sachlich und anonym;
- keine Diagnose, keine Notenlogik, kein Ranking;
- die Struktur ist im Alltag schnell lesbar;
- der nächste Schritt ist konkret und pädagogisch brauchbar.

### Querschnittskriterien für alle Slices
- lokal und datensparsam;
- keine echten Schülerdaten;
- keine scham- oder druckvolle Sprache;
- kindgerechte Sprache kurz und ruhig;
- technisch so einfach wie möglich;
- in Alpha 3 lieber klein und sicher als groß und riskant.

## 8. Kurzentscheidung für die weitere Umsetzung

Für Alpha 3 ist die Reihenfolge klar:
1. sichere lokale Bildhilfe;
2. Audio nur als klare, bewusst gewählte Stufe;
3. Lehrer-Support-Historie in sauberer Beobachtungslogik.

Damit bleibt der Kinderfluss ruhig und die Lehreransicht fachlich brauchbar, ohne Datenschutz oder Umsetzbarkeit zu überziehen.
