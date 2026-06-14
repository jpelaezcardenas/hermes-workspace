# Alpha 42A – Progressionsleiste UI-Polish Audit

## Kurzbefund
Die Kinder-Progressionsleiste ist fachlich stimmig und ruhig genug, wirkt aber noch etwas schwer: Sie kombiniert die Überschrift „Mein Leseweg“, sechs Chips und die Zusatzzeile „Jetzt lesen“ in einer einzigen, langen Zeile. Zusammen mit dem horizontalen Scrollen entsteht eher ein Informationsband als eine leicht erfassbare Orientierungshilfe.

## Prüfung der drei Fragen

### 1) Visuelle Schwere
Eher mittel bis hoch.
- `strong` + sechs Pills + `em` liegen dicht beieinander.
- Die Inhalte sind zwar klar, aber visuell stark textlastig.
- Die Leiste konkurriert dadurch leicht mit der ruhigeren Leseleiter darunter.

### 2) Länge / Scroll-Abhängigkeit
Eher zu lang für eine schnelle kindliche Erstorientierung.
- Die Begriffe sind sachlich sinnvoll, aber für einen Blickmoment relativ viel.
- Horizontaler Scroll ist hier praktisch, aber nicht ideal als Hauptlesehilfe.
- Die Leiste funktioniert besser als Statusanzeige denn als sofort lesbares Orientierungselement.

### 3) Ähnlichkeit zur bestehenden Leseleiter
Teilweise zu nah dran.
- Beide Bereiche nutzen ähnliche sprachliche Strukturen und ähnliche visuelle Prinzipien.
- Der Unterschied ist inhaltlich erkennbar, aber visuell noch nicht stark genug.
- Die Progressionsleiste sollte stärker als „aktueller Pfad in klein“ wirken, nicht als zweite, fast gleichwertige Leiter.

## Genau eine empfohlene Alpha-42B-Polish-Idee
Die Leiste sollte auf eine klarere Hierarchie verdichtet werden: ein kompakter, besser gegliederter Statusstreifen mit stärker betontem aktuellem Schritt und optisch ruhigeren Nebenchips.

Das verbessert:
- Orientierung auf einen Blick
- Attraktivität durch weniger Textdruck
- Abgrenzung zur eigentlichen Leseleiter
- Wahrnehmbarkeit ohne neue Inhalte

## Konkrete Umsetzungsempfehlung für Alpha 42B
In `src/App.tsx` und `src/styles.css` die Kinder-Progressionsleiste zu einem kompakteren Statusstreifen verdichten, indem der aktuelle Schritt deutlich stärker hervorgehoben wird und die übrigen Chips visuell zurückgenommen werden, ohne neue Inhalte hinzuzufügen.

## Beobachtungsnotiz
Für die nächste Prüfung genügt ein kurzer Blick darauf, ob ein Kind die aktuelle Station schneller erkennt, ohne die Zeile lesen oder scrollen zu müssen.

## Datenschutz-/Rahmenhinweis
Keine personenbezogenen Daten verarbeitet. Keine neuen Inhalte, Diagnosen, Scores oder automatischen Bewertungen vorgesehen.
