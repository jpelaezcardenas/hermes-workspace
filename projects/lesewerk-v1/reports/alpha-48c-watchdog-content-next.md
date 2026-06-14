# Alpha 48C – Watchdog Leselogik und Inhaltsausbau

## Ampel
Grün mit kleinem Restgelb.

## Kurzfazit
Die Leselogik wirkt nach Alpha 48A/48B deutlich ruhiger und klarer: Der Kinderpfad zeigt nun den aktuellen Schritt und den nächsten Schritt direkt, ohne die Route zu verändern oder neue Inhalte einzuführen. Damit ist die Orientierung vom Bild zur Silbe, zum Wort und zum Satz sichtbarer geworden, ohne den Kinderblick zu überladen.

Für den nächsten Wertschritt ist nicht mehr primär die Weganzeige der Engpass, sondern die Qualität und Passung der Inhalte im vorhandenen Gerüst. Alpha 49 sollte deshalb vorrangig in Richtung Inhaltsqualität für bekannte Buchstaben/Wörter und zusätzlich in Richtung teacher-side Entwicklungssteuerung gehen, aber nicht wieder zuerst in weitere Kinderschritte oder neue Navigation.

## Evidenz
- Alpha 48A zeigt: Die Orientierungskette Bild → Silbe → Wort → Satz → Mini-Geschichte ist bereits fachlich vorhanden, aber die sichtbare Wegführung war noch zu indirekt.
- Alpha 48B hat genau die kleinste sichere Verbesserung umgesetzt: `Jetzt lesen` und `Danach` sind im Kinderpfad sichtbar, die Reihenfolge blieb unverändert.
- Die Verifikation ist stabil: `npm test` mit 148/148 Tests bestanden, `npm run build` erfolgreich.
- Die Sicherheitsgrenzen blieben intakt: keine echten Lernerdaten, keine Scores, keine Timer, kein Ranking, keine Diagnose, keine Cloud-/Upload-/Login-Funktionen, keine neuen externen Assets.
- Aus fachlicher Sicht ist der Kinderpfad jetzt ausreichend klar, um die nächste Phase stärker auf Lernqualität statt auf weitere Sichtbarkeitsarbeit zu legen.

## Bewertung
1. Ist der aktuelle Leseschritt besser verständlich?
   Ja. Der aktuelle Schritt ist jetzt direkt benannt, der nächste Schritt ist kurz mitlesbar. Das senkt Orientierungsaufwand.

2. Ist der Weg von Bild zu Silbe zu Wort zu Satz klarer, ohne busier zu werden?
   Ja. Die Klarheit ist gestiegen, ohne die Route zu ändern oder zusätzliche Bedienung einzubauen. Die Lösung bleibt ruhig.

3. Haben die Sicherheitsconstraints gehalten?
   Ja. Die Änderungen bleiben lokal, anonym, ohne Bewertungssprache und ohne externe/protected Inhalte.

## Risiken / Restunsicherheit
- Die nächste-Stufe-Markierung ist bewusst dezent. Falls sie im echten Tablet-Alltag noch zu schwach wirkt, wäre nur eine kleine Kontrastanpassung sinnvoll, nicht eine neue Funktion.
- Die aktuelle Klarheit verbessert Orientierung, ersetzt aber noch nicht die Frage, ob die Inhalte für bekannte Buchstaben wirklich breit, wiederholbar und alltagsnah genug sind.
- Teacher-side Entwicklungssteuerung ist fachlich sinnvoll, sollte aber nicht in Richtung Diagnose oder Scorelogik kippen.

## Empfehlung für Alpha 49
Primärer Pfad: Inhaltsqualität und Aufgabenvielfalt für bekannte Buchstaben/Wörter ausbauen.
Sekundärer Pfad: teacher-side Entwicklungscontrols ergänzen, damit das Kollegium gezielter zwischen ruhigem Wiederholen, reduzierter Auswahl und nächstem Lernschritt steuern kann.

Begründung:
- Die Leselogik ist jetzt ausreichend sichtbar.
- Der nächste Engpass liegt eher in passender Aufgabenqualität als in weiterer Navigation.
- Für GE ist Wiederholung mit sinnvoller Variation meist wertvoller als noch mehr Wegmarkierung.

## Empfohlene Alpha-49-Task-Chain
1. Alpha 49A – Content-Audit für bekannte Buchstaben und frühe Wörter
   - Prüfen, welche bekannten Buchstaben/Wörter schon gut abgedeckt sind und wo Wiederholung, Kontrast oder alltagsnahe Beispiele fehlen.
   - Fokus: Qualität, Ruhe, Wiederverwendbarkeit, keine neuen Inhalte als Quantitätsziel.

2. Alpha 49B – Aufgabenqualität für bekannte Buchstaben gezielt verbessern
   - Mehr stimmige Übungsvarianten innerhalb des bestehenden Rahmens: gleiche Lernidee, klare Reize, bessere Passung.
   - Keine neue Navigationslogik, kein Überladen des Kinderpfads.

3. Alpha 49C – teacher-side Entwicklungssteuerung klein und sicher
   - Einfache, lokal bleibende Controls für z. B. weniger Auswahl, mehr Wiederholung, nächster Schritt, ohne Diagnose- oder Rankinglogik.
   - Nur so weit, wie es die Unterrichtsentscheidung wirklich entlastet.

4. Optional danach: Alpha 49D – kleine Strukturprüfung im Kinderpfad nach Content-Ausbau
   - Nur falls nötig, um sicherzustellen, dass mehr Inhalte die ruhige Orientierung nicht wieder verwässern.

## Abschluss
Alpha 48C bewertet die Leselogik insgesamt als grün und den nächsten Hebel als klar: nicht mehr primär Wegsichtbarkeit, sondern bessere Inhalte und feinere Lehrkraftsteuerung. Das ist die sinnvollste Richtung für Alpha 49, wenn LeseWerk ein gutes GE-Lern- und Diagnostikentwicklungswerkzeug werden soll.
