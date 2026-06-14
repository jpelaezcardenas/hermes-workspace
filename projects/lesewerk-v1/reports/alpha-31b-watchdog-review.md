# Alpha 31B - Watchdog Review

## Ampel
Green.

## Green
- `npm test` läuft vollständig grün: 126/126 Tests.
- `npm run build` läuft erfolgreich.
- Alpha-31-Inhalte sind echte, konkrete deutsche Wörter/Aufgaben und kein Zufalls-Bulk.
- Alpha-31 ist opt-in über `includeAlpha31Pack`; Alpha-30-Pfade bleiben standardmäßig unverändert.
- Graphem-/Silben-Gating schützt frühe M+A-Profile vor Sofa/Mofa/Limo/Tasse/Tisch.
- Der Kinderpfad hat nur noch eine dominante Startaktion im Tagespfad-Header.
- Bibliothek/Details sind sekundär und visuell tiefer eingeordnet.
- Browser-Smoke bestätigte: Tagespfad sichtbar, Schrittwechsel funktioniert über den Schrittkarten-Button `Weiter`, keine horizontale Überbreite, Lehrkraftmodus bleibt erreichbar. `Tagespfad starten` dient als Start-/Reset-Aktion im Header.

## Yellow
- Es gibt weiterhin mehrere didaktische Anzeigeebenen unterhalb der Hauptkarte: Tagesweg-Karten, Leseleiter und aktive Lesekarte. Sie sind niedriger priorisiert, aber noch nicht vollständig getrennt.
- Die Alpha-31-Mini-Geschichte ist aus Kompatibilitätsgründen als bestehender Aufgabentyp modelliert; die Story-Ebene ist fachlich vorhanden, technisch aber noch keine eigene neue Story-Collection.
- Für echte Unterrichtsnutzung braucht der Pack mehr Wiederholung, Materialvarianten und lehrkraftgeprüfte Bild-/Symbolkarten.
- Ein bestehender Quelltest erwartet historische Marker wie `Lesepfad starten`; diese wurden als Kommentar-Marker erhalten, während die sichtbare UI `Tagespfad starten` nutzt.

## Sicherheitsprüfung
Keine realen Lernenden, Namen, Diagnosen, Logins, Cloud-, Export-, Ranking-, Score-, Timer- oder Leseralter-Funktionen wurden eingeführt. Es wurden keine METACOM-, ARASAAC-, Boardmaker-, Widgit- oder anderen geschützten Symbolassets eingebunden. Die App bleibt lokal und beobachtungsorientiert.

## Bewertung
Alpha 31B erfüllt den Auftrag: Die App fühlt sich inhaltlich breiter an, ohne unkontrollierte Masse einzuführen, und der Kinderpfad ist auf den ersten Blick ruhiger. Der größte qualitative Fortschritt ist nicht die Menge allein, sondern die Kombination aus opt-in Content, Profil-Gating und niedriger priorisierter Bibliothek.

## Nächster sinnvoller Schritt
Alpha 32 sollte nicht sofort noch mehr UI bauen. Sinnvoll wäre ein kleiner Review-/Refactor-Slice:
1. Alte Quelltests von Kommentar-Markern auf tatsächliche UI-Absicht umstellen.
2. Story- und Schreibbrücken-Metadaten expliziter modellieren, ohne die bestehende Level-A/B/C-Kompatibilität zu brechen.
3. Einen weiteren 12-16er Content-Slice nur nach gleichem Gating-Muster ergänzen.
