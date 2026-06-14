# Alpha 14 Slice D – Final watchdog and Alpha 15 recommendation

Datum: 2026-05-17
Status: Accepted / nicht blockiert
Entscheidung: Alpha 14 kann als lokaler, anonymisierter 10–15-Minuten-Pilot-Demo-Stand weiterverwendet werden. Keine Freigabe für Veröffentlichung, Kollegiums-Rollout oder Verkauf.

## Kurzfazit

Alpha 14 ist technisch und inhaltlich stabil genug für den nächsten sehr kleinen lokalen GE-Pilot im geschützten Rahmen. Die Slice-B-Änderungen zur Versionsklarheit, Lehrkraft-Orientierung und Pilot-Checkliste sind vorhanden, Slice C hat sie GE-/datenschutzfachlich akzeptiert, und die finalen Checks zeigen keine Build-, Test- oder Datenschutz-Blocker.

Wichtig: Das ist keine Produktreife- oder Diagnostikfreigabe. Die App bleibt ein lokaler Demo-Stand mit anonymen Profilen und menschlicher Lehrkraftführung.

## Was sich in Alpha 14 geändert hat

Aus den vorliegenden Slice-Berichten:

- `reports/alpha-14-gap-audit-and-pilot-blueprint.md`: Self-gap audit und Blueprint für Pilot-Readiness erstellt.
- `reports/alpha-14-pilot-readiness-report.md`: sichtbare Versionssprache von stale `LeseWerk Alpha 12 · lokale Demo` auf `LeseWerk · lokaler Pilot-Demo-Stand` geschärft; Lehrkraft-Onboarding `Kurzer lokaler Lesemoment` ergänzt; `10–15-Minuten-Pilot` konkretisiert; Tests für Alpha-14-Grenzen ergänzt.
- `reports/alpha-14-ge-pilot-readiness-review.md`: GE/privacy Review mit Entscheidung `Accept with minor notes`.

## Exakte Checks

Arbeitsverzeichnis:

```bash
cd /Users/zondrius/hermes-workspace/projects/lesewerk-v1
```

Ausgeführt:

```bash
npm test
npm run build
node - <<'NODE'
const fs=require('fs'); const path=require('path');
const root='src';
const patterns=[
 ['realNames',/\b([A-ZÄÖÜ][a-zäöüß]+\s+[A-ZÄÖÜ][a-zäöüß]+)\b/g],
 ['network',/\b(fetch|XMLHttpRequest|axios|WebSocket|navigator\.sendBeacon)\b/g],
 ['cloudUpload',/\b(Cloud|Upload|Online-Übertragung|Datei|Klassenliste|Fotos?)\b/gi],
 ['unsafeAssessment',/\b(Score|Punkte|Rangliste|Leaderboard|Note|Prozent|IQ|Diagnose|diagnostisch|kann nicht)\b/gi],
 ['staleAlpha12',/LeseWerk Alpha 12|Alpha 12 · lokale Demo/gi],
 ['storage',/localStorage|sessionStorage|indexedDB/gi]
];
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(d=>{const p=path.join(dir,d.name); return d.isDirectory()?files(p):[p];});}
for (const [name,re] of patterns){
 let hits=[];
 for(const f of files(root).filter(f=>/\.(tsx?|mjs|css)$/.test(f))){
  const s=fs.readFileSync(f,'utf8'); let m; while((m=re.exec(s))){ const line=s.slice(0,m.index).split('\n').length; hits.push(`${f}:${line}:${m[0]}`); if(hits.length>20) break; }
 }
 console.log(`## ${name}: ${hits.length}`);
 console.log(hits.slice(0,20).join('\n') || 'none');
}
NODE
python3 -m http.server 5180 --bind 127.0.0.1 -d dist
```

Browsercheck über:

```text
http://127.0.0.1:5180/
```

Zusätzlich geprüft:

```bash
git status --short -- /Users/zondrius/hermes-workspace/projects/lesewerk-v1
git diff --name-only -- /Users/zondrius/hermes-workspace/projects/lesewerk-v1
```

## Testergebnis

`npm test`:

- Ergebnis: bestanden
- Tests: 64
- Pass: 64
- Fail: 0
- Dauer laut Node-Testausgabe: ca. 50 ms

`npm run build`:

- Ergebnis: bestanden
- Build-Befehl lief durch: `tsc -b && node scripts/build.mjs`
- Keine Build-Fehler ausgegeben.

## Source-Level Privacy-/Content-Safety-Scan

Scan-Ergebnis:

- `network`: 0 Treffer für `fetch`, `XMLHttpRequest`, `axios`, `WebSocket`, `sendBeacon`.
- `staleAlpha12`: 0 Treffer für `LeseWerk Alpha 12` / `Alpha 12 · lokale Demo`.
- `storage`: 3 Treffer, alle in `src/App.tsx` als bewusst lokaler `localStorage`-Demo-Stand für anonymes Profil / Reset.
- `cloudUpload`: Treffer sind Schutzformulierungen in sichtbaren Datenschutz-Hinweisen, z. B. `keine Fotos`, `keine Cloud`, `keine Datei`, `keine Online-Übertragung`.
- `unsafeAssessment`: 1 Treffer `Diagnose` in der Schutzformulierung `Ohne Diagnose enden`.
- `realNames`: viele Regex-False-Positives durch deutsche UI-Überschriften wie `Anonymes Profil`, `Kinderpfad Lesen`, `Dein Tagesweg`; kein echter Personenname erkannt.

Bewertung: Keine Blocker. Die Treffer stützen überwiegend die Datenschutzgrenzen statt sie zu verletzen.

## Browsercheck nach Build

Geprüft mit lokalem statischen Server auf Port 5180.

Bestanden:

- App lädt unter `http://127.0.0.1:5180/`.
- Seitentitel: `LeseWerk V1`.
- Sichtbarer Hero zeigt `LESEWERK · LOKALER PILOT-DEMO-STAND`.
- Keine Browser-Konsolenfehler beim Laden und Umschalten.
- Kinderpfad zeigt anonyme Profile, Hilfen, Tagesweg und Lesekarte.
- Lehrkraftbereich öffnet und zeigt `Kurzer lokaler Lesemoment`, Datenschutz-/Pilotgrenzen, Tagesweg-Wahl, Vorschlag, `Kurz und ruhig durchführen`, anonyme Beobachtungskarte und lokale Druckvorschau.
- Ein kurzer Kinderpfad-Smoke-Test bis zur Lesekarte `Zeige Mond.` war möglich.

Nicht vollständig geprüft:

- Kein echter iPad-/Tablet-Test mit Touchgerät.
- Kein vollständiger Durchlauf aller 48 Aufgaben und 24 Story-Pfade.
- Keine reale Unterrichtserprobung mit Kindern.

## Git-/Workspace-Hinweis

Der Pfad `/Users/zondrius/hermes-workspace/projects/lesewerk-v1` erscheint aus Sicht des übergeordneten Git-Repos `/Users/zondrius/hermes-workspace` als untracked Verzeichnis (`?? ./` bei scoped status). `git diff --name-only -- /Users/zondrius/hermes-workspace/projects/lesewerk-v1` zeigte deshalb keine tracked Diff-Namen für diese App.

Zusätzlich existieren außerhalb dieses Projektpfads Änderungen im übergeordneten Workspace. Diese wurden für Slice D nicht angefasst und nicht bereinigt.

## Entscheidung

Accepted / nicht blockiert.

Begründung:

- Tests und Build bestehen.
- Browser-Smoke-Test nach Build besteht.
- Slice C akzeptiert GE-/Datenschutz-Pilotführung mit nur kleinen Praxisnotizen.
- Source-Level Scan findet keine Netzwerk-/Cloud-/Upload-Logik, keine echten Namen und keine stale Alpha-12-Sprache.
- Die sichtbare Sprache bleibt lokal, anonym, nicht-diagnostisch und ohne Reife- oder Verkaufsversprechen.

## Verbleibende Risiken

- Die Kinderoberfläche bleibt für manche GE-Lernende noch relativ funktionsreich; Lehrkraft muss den Start eng führen.
- Lokale `localStorage`-Nutzung ist für anonyme Demo-Profile vertretbar, muss aber für externe Nutzung sauber dokumentiert oder weiter reduziert werden.
- Die App kann nicht verhindern, dass Erwachsene außerhalb der App echte Namen handschriftlich oder mündlich ergänzen.
- Keine externe Datenschutz-, Lizenz- oder Barrierefreiheitsprüfung.
- Keine Unterrichtsevidenz mit echten Geräten und realer Klassensituation.
- Keine Produkt-/Sellable-Quality: keine validierte Symbolstrategie, kein Supportmodell, keine Rechtsprüfung, keine Nutzerinterviews.

## Eine präzise Alpha-15-Empfehlung

Alpha 15 sollte keine neue große Funktion bauen, sondern einen `2-Karten-Pilotmodus` als primären Kinder-Erstfluss umsetzen und testen:

- Start aus Sicht der Lehrkraft: `Pilot starten: nur 2 Karten`.
- Kinderansicht zeigt dann nur Profil, eine voreingestellte Hilfe und genau zwei Karten; Bibliothek und Zusatzwege bleiben sekundär oder eingeklappt.
- Akzeptanzcheck: `npm test`, `npm run build`, Browsercheck Desktop + schmale Breite, ein Durchlauf `Profil wählen → 2 Karten → Fertig`, Datenschutzscan unverändert ohne echte Namen/Cloud/Diagnostik.

Warum genau das: Es reduziert die größte verbleibende GE-Praxisunsicherheit aus Slice A/C, ohne neue Diagnostik, Datenflüsse oder Content-Komplexität einzuführen.
