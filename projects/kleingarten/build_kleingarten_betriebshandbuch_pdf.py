from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

PDF = "/Users/zondrius/hermes-workspace/projects/kleingarten/Kleingarten_Betriebshandbuch_2026.pdf"

styles = getSampleStyleSheet()


title = ParagraphStyle(
    "TitleCustom",
    parent=styles["Title"],
    fontName="Helvetica-Bold",
    fontSize=21,
    leading=25,
    textColor=colors.HexColor("#214E3A"),
    alignment=TA_CENTER,
    spaceAfter=5,
)
subtitle = ParagraphStyle(
    "Subtitle",
    parent=styles["BodyText"],
    fontName="Helvetica",
    fontSize=10.2,
    leading=13,
    textColor=colors.HexColor("#5A5A5A"),
    alignment=TA_CENTER,
    spaceAfter=12,
)
h1 = ParagraphStyle(
    "H1",
    parent=styles["Heading1"],
    fontName="Helvetica-Bold",
    fontSize=14.6,
    leading=17,
    textColor=colors.HexColor("#2E6B47"),
    spaceBefore=8,
    spaceAfter=5,
)
h2 = ParagraphStyle(
    "H2",
    parent=styles["Heading2"],
    fontName="Helvetica-Bold",
    fontSize=11.4,
    leading=14,
    textColor=colors.HexColor("#2E74B5"),
    spaceBefore=6,
    spaceAfter=3,
)
body = ParagraphStyle(
    "Body",
    parent=styles["BodyText"],
    fontName="Helvetica",
    fontSize=8.9,
    leading=11.0,
    textColor=colors.HexColor("#222222"),
    spaceAfter=3.5,
)
small = ParagraphStyle(
    "Small",
    parent=body,
    fontSize=8.0,
    leading=9.8,
)
cell = ParagraphStyle(
    "Cell",
    parent=small,
    spaceAfter=0,
)
cell_bold = ParagraphStyle(
    "CellBold",
    parent=cell,
    fontName="Helvetica-Bold",
)
callout = ParagraphStyle(
    "Callout",
    parent=body,
    fontName="Helvetica-Bold",
    fontSize=9.5,
    leading=12,
    textColor=colors.HexColor("#214E3A"),
    spaceBefore=4,
    spaceAfter=7,
)
warning = ParagraphStyle(
    "Warning",
    parent=body,
    fontName="Helvetica-Bold",
    textColor=colors.HexColor("#7A3B00"),
    spaceBefore=4,
    spaceAfter=7,
)


def p(text, style=body):
    return Paragraph(text, style)


def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#6A6A6A"))
    canvas.drawString(1.45 * cm, 1.0 * cm, "Kleingarten-Betriebshandbuch 2026")
    canvas.drawRightString(19.5 * cm, 1.0 * cm, f"Seite {doc.page}")
    canvas.restoreState()


def table_style(header="#E8F2EA"):
    return TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor(header)),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#214E3A")),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#D5DDD7")),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING", (0, 0), (-1, -1), 4.6),
            ("RIGHTPADDING", (0, 0), (-1, -1), 4.6),
            ("TOPPADDING", (0, 0), (-1, -1), 4.4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4.4),
        ]
    )


def bullets(items):
    return [p(f"• {item}", body) for item in items]


def numbered(items):
    return [p(f"<b>{i}.</b> {item}", body) for i, item in enumerate(items, 1)]


def compact_check(items):
    return [p(f"[ ] {item}", body) for item in items]


def box(text, style=callout, bg="#EEF6EF", border="#BFD8C4"):
    tbl = Table([[p(text, style)]], colWidths=[17.0 * cm])
    tbl.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor(bg)),
                ("BOX", (0, 0), (-1, -1), 0.7, colors.HexColor(border)),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        )
    )
    return tbl


flow = [
    p("Kleingarten-Betriebshandbuch 2026", title),
    p(
        "Individueller Startplan für euren neuen Garten · 3 Familien · Hochbeete · Bewässerung · Häuschen · Übergabe",
        subtitle,
    ),
    box(
        "Kurzstrategie: Übernehmen, prüfen, dokumentieren, dann erst groß einkaufen. Die Bewässerungsanlage ist ein riesiger Vorteil, aber erst nach Test verlässlich.",
    ),
]

flow.append(p("Die 12 Weltklasse-Regeln", h1))
flow.extend(
    numbered(
        [
            "Verein und Pacht zuerst klären, dann Geld und Inventar sauber übergeben.",
            "Bargeld nur mit Quittung, Übergabeprotokoll und klarer Liste.",
            "Die Bewässerung wird nicht geglaubt, sondern getestet.",
            "In den ersten 14 Tagen nicht alles bepflanzen, sondern System verstehen.",
            "Jedes Hochbeet bekommt eine Aufgabe.",
            "Wasser schlägt Dünger: Feuchte, Mulch und Tropfpunkt entscheiden den Ertrag.",
            "Haus, Küche und Dachboden werden in Zonen organisiert.",
            "Vormieter-Sachen erst sortieren: behalten, prüfen, entsorgen, später entscheiden.",
            "Drei Familien brauchen Kalender, Geldtopf und klare Zuständigkeiten.",
            "Ein kleiner Sportbereich bleibt frei: Kettlebell, Mobility, kurze Garten-Workouts.",
            "Jede Woche kurz dokumentieren: Fotos, Ernte, Probleme, nächste Aktion.",
            "Der Garten soll produktiv sein, aber nicht zum zweiten Vollzeitjob werden.",
        ]
    )
)

flow.append(p("Freitag: Übergabe ohne Stress", h1))
flow.append(p("Ablauf vor Ort", h2))
flow.extend(
    numbered(
        [
            "Ruhig starten, keine Hektik.",
            "Verein/Pachtstatus abgleichen: Wer wird Vertragspartner, welche Daten fehlen, ab wann läuft die Pacht?",
            "Parzelle komplett abgehen: Grenzen, Schlüssel, Wasser, Strom, Häuschen, Dachboden, Beete.",
            "Bewässerungsanlage live demonstrieren lassen.",
            "Inventar grob erfassen: Was bleibt sicher, was ist offen, was wird noch mitgenommen?",
            "Kaufvertrag, Inventarliste und Quittung schreiben oder ergänzen.",
            "Bargeld erst gegen saubere Unterlagen, Schlüssel und klare Übergabe.",
            "Danach 20 Minuten Fotos/Videos machen, bevor etwas umgeräumt wird.",
        ]
    )
)
flow.append(
    box(
        "Bargeld-Hinweis: Betrag, Datum, Namen, Parzelle, enthaltene Gegenstände und beide Unterschriften schriftlich festhalten. Bei Unklarheit lieber Teilzahlung oder schriftlichen Vorbehalt vereinbaren.",
        warning,
        "#FFF4E4",
        "#E2B56F",
    )
)

flow.append(p("Muss geprüft werden", h2))
flow.extend(
    compact_check(
        [
            "Pacht läuft über den Verein, nicht über den Vormieter.",
            "Verein kennt euch und bestätigt den weiteren Ablauf.",
            "Alle Schlüssel erhalten: Tor, Laube, Schuppen, Dachboden, ggf. Wasser/Strom.",
            "Bewässerung, Küche, Werkzeuge, Möbel, Hochbeete, Pflanzen und Geräte grob in Inventarliste.",
            "Zählerstände/feste Anschlüsse fotografieren, falls vorhanden.",
            "Offene Punkte notieren: Was ist unklar, wer meldet sich bis wann?",
        ]
    )
)
flow.append(PageBreak())

flow.append(p("Bewässerungsanlage: euer größter Hebel", h1))
flow.append(
    box(
        "Status: Es gibt eine Steuerung. Theoretisch wird der Garten für Wochen abgedeckt. Technisch ist noch unklar, ob Hochbeete, Rasen und andere Bereiche vollständig versorgt werden.",
    )
)
flow.append(p("Übergabe-Test", h2))
flow.extend(
    compact_check(
        [
            "Wo ist die Wasserquelle: Leitung, Brunnen, Tank, Fass, Pumpe?",
            "Wo ist der Hauptabsperrhahn?",
            "Wie startet man manuell?",
            "Welche Programme laufen aktuell?",
            "Welche Zonen gibt es: Hochbeete, Rasen, Obst, Hecke, Blumen?",
            "Wie lange läuft jede Zone?",
            "Was passiert bei Stromausfall oder leerem Tank?",
            "Wo sind Filter, Druckminderer, Ventile und kritische Verbindungen?",
            "Wie wird winterfest gemacht?",
            "Video aufnehmen, während der Vormieter die Steuerung erklärt.",
        ]
    )
)

flow.append(p("7-Tage-Prüfplan", h2))
test_data = [[p("<b>Tag</b>", cell), p("<b>Aktion</b>", cell)]]
for day, action in [
    ("1", "Manuell starten, alle Zonen beobachten, Lecks markieren."),
    ("2", "Hochbeete morgens prüfen: oben trocken ist okay, 5 cm tief muss es feucht sein."),
    ("3", "Laufzeiten notieren, zu nasse und zu trockene Stellen markieren."),
    ("4", "Priorität setzen: Tomaten, Gurken, Zucchini und Jungpflanzen zuerst."),
    ("5", "Rasen prüfen, aber nicht auf Kosten der Hochbeete."),
    ("6", "Programme nur vorsichtig ändern, immer mit Notiz."),
    ("7", "Familienregel festlegen: Wer schaut einmal pro Woche auf Wasser?"),
]:
    test_data.append([p(day, cell_bold), p(action, cell)])
t = Table(test_data, colWidths=[1.2 * cm, 15.8 * cm], repeatRows=1)
t.setStyle(table_style())
flow.append(t)

flow.append(p("Wasser-Prioritäten", h2))
flow.extend(
    numbered(
        [
            "Jungpflanzen und frisch gesäte Reihen.",
            "Tomaten, Gurken, Zucchini, Paprika.",
            "Erdbeeren, Kräuter, Salat.",
            "Obststräucher und neue Pflanzungen.",
            "Blumen/Nützlingsbereiche.",
            "Rasen nur, wenn Wasser reichlich verfügbar ist.",
        ]
    )
)
flow.append(PageBreak())

flow.append(p("Häuschen, Küche und Dachboden", h1))
flow.append(box("Das Häuschen ist eure Basisstation. Wenn es gut organisiert ist, wird der Garten leichter."))
house_data = [
    [p("<b>Zone</b>", cell), p("<b>Was gehört hinein?</b>", cell)],
    [p("Küche", cell_bold), p("Tassen, Teller, Messer, Erste-Hilfe, Handtücher, Müllbeutel.", cell)],
    [p("Werkzeugwand", cell_bold), p("Schere, Handschuhe, Schnur, Etiketten, Schaufel, kleine Hacke.", cell)],
    [p("Saatgutstation", cell_bold), p("Saatgut trocken, beschriftet und mäusesicher lagern.", cell)],
    [p("Technikfach", cell_bold), p("Steuerungsnotizen, Adapter, Dichtungen, Ersatzteile.", cell)],
    [p("Familienkiste", cell_bold), p("Sonnencreme, Pflaster, Wechselshirt, Kinderhandschuhe.", cell)],
    [p("Dokumentenmappe", cell_bold), p("Vertrag, Übergabeprotokoll, Quittung, Pachtinfos, Inventarliste.", cell)],
]
t = Table(house_data, colWidths=[4.0 * cm, 13.0 * cm], repeatRows=1)
t.setStyle(table_style("#EAF2FB"))
flow.append(t)

flow.append(p("Dachboden-Regeln", h2))
flow.extend(
    bullets(
        [
            "Gut geeignet: leichte Möbelauflagen, leere Kisten, saisonale Deko, trockene Töpfe.",
            "Erst prüfen: Elektrogeräte, alte Leuchten, Gaszubehör, unbekannte Kartons.",
            "Nicht dort lagern: feuchte Erde, offene Dünger, Chemie, Lebensmittel, schwere Lasten.",
        ]
    )
)

flow.append(p("Vormieter-Inventar", h2))
inventory_data = [
    [p("<b>Kategorie</b>", cell), p("<b>Beispiele</b>", cell), p("<b>Aktion</b>", cell)],
    [p("Behalten", cell_bold), p("brauchbare Werkzeuge, Möbel, Küche, Töpfe", cell), p("reinigen, beschriften, festen Platz geben", cell)],
    [p("Prüfen", cell_bold), p("Elektro, Gas, Pumpe, Steuerung, Dünger", cell), p("nur nutzen, wenn Zustand klar ist", cell)],
    [p("Entsorgen", cell_bold), p("kaputte Geräte, nasse Textilien, Altlasten", cell), p("separat sammeln, nicht im Garten verstecken", cell)],
    [p("Später kaufen", cell_bold), p("Regale, Adapter, Erde, Werkzeuge", cell), p("erst nach Inventur", cell)],
]
t = Table(inventory_data, colWidths=[3.0 * cm, 7.0 * cm, 7.0 * cm], repeatRows=1)
t.setStyle(table_style())
flow.append(t)
flow.append(PageBreak())

flow.append(p("Sport- und Kettlebell-Zone", h1))
flow.append(
    box(
        "Ein fester kleiner Bewegungsort ist genial: Der Garten wird dadurch nicht nur produktiv, sondern auch euer Energieplatz.",
    )
)
flow.append(p("Standort", h2))
flow.extend(
    bullets(
        [
            "Ebene Fläche von ca. 2 x 3 m.",
            "Nicht direkt neben Glas, Hochbeetkanten oder Wasserleitungen.",
            "Möglichst im Halbschatten.",
            "Genug Abstand zu Wegen und spielenden Kindern.",
            "Trocken, rutschfest und frei von Stolperkanten.",
            "Kettlebell trocken im Häuschen lagern, nicht dauerhaft draußen.",
        ]
    )
)
flow.append(p("Ausstattung", h2))
flow.extend(
    bullets(
        [
            "1 robuste Outdoor-Matte oder zwei Stall-/Gummimatten.",
            "Kettlebell trocken lagern.",
            "Kleines Handtuch und Wasserflasche.",
            "Optional: einfache Dehnstange nur, wenn stabil und vereinskonform.",
        ]
    )
)
flow.append(p("8- bis 12-Minuten-Routine vor dem Gärtnern", h2))
flow.extend(
    numbered(
        [
            "Gelenke mobilisieren: Schultern, Hüfte, Rücken.",
            "2 leichte Sätze Kettlebell Deadlift oder Swing.",
            "2 Sätze Goblet Squat.",
            "1 Minute Atem runterfahren.",
            "Dann erst schwer heben, graben oder tragen.",
        ]
    )
)
flow.append(box("Regel: Sportbereich bleibt frei, auch wenn überall Sachen herumstehen.", warning, "#FFF4E4", "#E2B56F"))

flow.append(p("Hochbeet-Revolution", h1))
flow.append(
    box(
        "Durch Bewässerung habt ihr einen großen Vorteil. Trotzdem erst 5 bis 6 Beete produktiv starten und den Rest als Reserve, Blumen- oder Testfläche führen.",
    )
)
beet_data = [[p("<b>Beet</b>", cell), p("<b>Rolle</b>", cell), p("<b>Jetzt sinnvoll</b>", cell), p("<b>Wasser</b>", cell), p("<b>Hinweis</b>", cell)]]
for row in [
    ("HB1", "Tomaten-Kräuter", "Tomaten, Basilikum, Tagetes", "mittel", "Regenschutz prüfen, unten wässern"),
    ("HB2", "Gurken-Dill", "Gurken, Dill, Salat", "hoch", "braucht zuverlässige Feuchte"),
    ("HB3", "Bohnen-Mangold", "Buschbohnen, Mangold, Rote Bete", "mittel", "robust, guter Familienertrag"),
    ("HB4", "Kohlrabi-Wurzel", "Kohlrabi, Möhren, Zwiebeln", "mittel", "bei Kohl ggf. Netz"),
    ("HB5", "Erdbeer-Kinderbeet", "Erdbeeren, Schnittlauch, Borretsch", "mittel", "Naschbeet, motivierend"),
    ("HB6", "Zucchini kontrolliert", "maximal 1 Zucchini", "hoch", "wuchert, nur mit Platz"),
    ("HB7", "Schnellbeet", "Radieschen, Rucola, Pflücksalat", "mittel", "alle 2 Wochen nachsäen"),
    ("HB8", "Nützlingsbeet", "Ringelblume, Tagetes, Kornblume", "gering", "Bestäuber und Schönheit"),
    ("HB9", "Reserve", "Phacelia/Buchweizen oder Herbstkultur", "gering", "rettet vor Überplanung"),
]:
    beet_data.append([p(row[0], cell_bold), p(row[1], cell), p(row[2], cell), p(row[3], cell), p(row[4], cell)])
t = Table(beet_data, colWidths=[1.25 * cm, 3.45 * cm, 5.25 * cm, 2.0 * cm, 5.05 * cm], repeatRows=1)
t.setStyle(table_style())
flow.append(t)
flow.append(PageBreak())

flow.append(p("Drei-Familien-System", h1))
role_data = [
    [p("<b>Rolle</b>", cell), p("<b>Aufgabe</b>", cell)],
    [p("Wasser-Pate", cell_bold), p("prüft Anlage, Laufzeiten, trockene Stellen", cell)],
    [p("Beet-Pate", cell_bold), p("schaut auf Hochbeete, Nachsaat, Ernte", cell)],
    [p("Haus-Pate", cell_bold), p("Küche, Ordnung, Müll, Inventar", cell)],
    [p("Finanz-Pate", cell_bold), p("Einkaufsliste, gemeinsamer Topf, Quittungen", cell)],
]
t = Table(role_data, colWidths=[4.0 * cm, 13.0 * cm], repeatRows=1)
t.setStyle(table_style("#EAF2FB"))
flow.append(t)
flow.append(p("Gemeinsame Regeln", h2))
flow.extend(
    bullets(
        [
            "Eine gemeinsame Einkaufsliste statt Spontankäufe.",
            "Ab 25 Euro vorher kurz abstimmen.",
            "Ernte fair teilen oder direkt gemeinsam verbrauchen.",
            "Wer etwas leer macht, schreibt es auf.",
            "Kein unbekanntes Spritzmittel verwenden.",
            "Kinder dürfen ernten, aber ein Beet sollte als Kinder-/Naschbeet klar markiert sein.",
        ]
    )
)

flow.append(p("Erste 72 Stunden", h1))
flow.extend(
    numbered(
        [
            "Fotos von allem: Beete, Haus, Dachboden, Wasser, Inventar.",
            "Schlüssel und Dokumente in Mappe.",
            "Bewässerung testen, nicht sofort komplett umprogrammieren.",
            "Küche grob reinigen, Müll identifizieren.",
            "Gefährliche/unklare Stoffe separieren.",
            "5 bis 6 Hochbeete starten, nicht alle.",
            "Sportbereich freihalten und markieren.",
            "Erste Einkaufsliste nur für echte Lücken.",
        ]
    )
)

flow.append(p("Erste 14 Tage", h1))
flow.extend(
    bullets(
        [
            "Jeden zweiten Tag kurz Bodenfeuchte prüfen.",
            "Bewässerungszonen beschriften.",
            "Inventar sortieren: behalten, prüfen, entsorgen, kaufen.",
            "Eine Grundordnung im Häuschen schaffen.",
            "Beetnummern sichtbar anbringen.",
            "Einen gemeinsamen Gartentag der drei Familien festlegen.",
            "Erste Nachsaat im Schnellbeet starten.",
            "Mulch auf sensible Beete geben.",
        ]
    )
)
flow.append(PageBreak())

flow.append(p("Einkaufsliste", h1))
shop_data = [
    [p("<b>Sofort sinnvoll</b>", cell), p("<b>Erst nach Übergabe</b>", cell), p("<b>Nicht sofort</b>", cell)],
    [
        p("Stift, Etiketten, Mappe, Handschuhe, Müllsäcke, Lappen, Erste-Hilfe, Schnur, 1-2 Gießkannen, Mulch, Outdoor-/Gummimatte.", cell),
        p("Werkzeug, Erde/Kompost, Schlauchadapter, Ersatzteile, zusätzliche Bewässerungsteile, Regale/Kisten.", cell),
        p("Große Geräte, teure Smart-Sensoren, neue Möbel, zu viele Jungpflanzen, große Düngerpakete.", cell),
    ],
]
t = Table(shop_data, colWidths=[5.7 * cm, 5.8 * cm, 5.5 * cm], repeatRows=1)
t.setStyle(table_style("#FFF4E4"))
flow.append(t)

flow.append(p("Qualitätsstandard", h1))
flow.append(
    box(
        "Ein Weltklasse-Garten ist nicht der Garten mit den meisten Dingen. Es ist der Garten, in dem jede Woche klar ist: Was wächst? Was braucht Wasser? Was wird geerntet? Was ist kaputt oder unklar? Was kaufen wir wirklich? Wer macht den nächsten kleinen Schritt?",
    )
)

doc = BaseDocTemplate(
    PDF,
    pagesize=A4,
    leftMargin=1.45 * cm,
    rightMargin=1.45 * cm,
    topMargin=1.45 * cm,
    bottomMargin=1.35 * cm,
)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
doc.addPageTemplates([PageTemplate(id="page", frames=[frame], onPage=on_page)])
doc.build(flow)
print(PDF)
