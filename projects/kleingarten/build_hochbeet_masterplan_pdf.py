from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import BaseDocTemplate, Frame, PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle

PDF = "/Users/zondrius/hermes-workspace/projects/kleingarten/Hochbeet_Masterplan_2026.pdf"

styles = getSampleStyleSheet()
title = ParagraphStyle(
    "TitleCustom",
    parent=styles["Title"],
    fontName="Helvetica-Bold",
    fontSize=22,
    leading=26,
    textColor=colors.HexColor("#24523B"),
    alignment=TA_CENTER,
    spaceAfter=5,
)
subtitle = ParagraphStyle(
    "Subtitle",
    parent=styles["BodyText"],
    fontName="Helvetica",
    fontSize=10.5,
    leading=13,
    textColor=colors.HexColor("#555555"),
    alignment=TA_CENTER,
    spaceAfter=12,
)
h1 = ParagraphStyle(
    "H1",
    parent=styles["Heading1"],
    fontName="Helvetica-Bold",
    fontSize=15,
    leading=18,
    textColor=colors.HexColor("#2E6B47"),
    spaceBefore=9,
    spaceAfter=6,
)
h2 = ParagraphStyle(
    "H2",
    parent=styles["Heading2"],
    fontName="Helvetica-Bold",
    fontSize=12.2,
    leading=15,
    textColor=colors.HexColor("#2E74B5"),
    spaceBefore=7,
    spaceAfter=4,
)
body = ParagraphStyle(
    "Body",
    parent=styles["BodyText"],
    fontName="Helvetica",
    fontSize=9.4,
    leading=11.6,
    textColor=colors.HexColor("#222222"),
    spaceAfter=4,
)
cell = ParagraphStyle(
    "Cell",
    parent=body,
    fontSize=8.3,
    leading=10.0,
    spaceAfter=0,
)
cell_bold = ParagraphStyle(
    "CellBold",
    parent=cell,
    fontName="Helvetica-Bold",
)


def p(text, style=body):
    return Paragraph(text, style)


def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#6A6A6A"))
    canvas.drawString(1.55 * cm, 1.0 * cm, "Hochbeet-Masterplan 2026 · Kleingarten")
    canvas.drawRightString(19.4 * cm, 1.0 * cm, f"Seite {doc.page}")
    canvas.restoreState()


def table_style():
    return TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#E8F2EA")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#24523B")),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#D4DED6")),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING", (0, 0), (-1, -1), 5),
            ("RIGHTPADDING", (0, 0), (-1, -1), 5),
            ("TOPPADDING", (0, 0), (-1, -1), 5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ]
    )


def bullet_list(items):
    flow = []
    for item in items:
        flow.append(p(f"• {item}", body))
    return flow


def numbered_rules(items):
    flow = []
    for i, item in enumerate(items, 1):
        flow.append(p(f"<b>{i}.</b> {item}", body))
    return flow


flow = [
    p("Hochbeet-Masterplan 2026", title),
    p("Weltklasse-Gartenstart für euren neuen Kleingarten · Stand 21.05.2026", subtitle),
]

flow.append(p("Die 10 Weltklasse-Regeln", h1))
flow.extend(
    numbered_rules(
        [
            "Erst beobachten, dann kaufen.",
            "Jedes Hochbeet bekommt eine klare Rolle.",
            "Wasser ist wichtiger als Düngermenge.",
            "Mulch ist Hitzeschutz, Bodenschutz und Zeitgewinn.",
            "Starkzehrer im ersten Hochbeetjahr nutzen, aber nicht überdüngen.",
            "Mischkultur macht den Garten stabiler und schöner.",
            "Blumen sind kein Luxus, sondern Nützlings-Infrastruktur.",
            "Ein Reservebeet ist strategisch klug.",
            "Drei Familien brauchen klare Regeln.",
            "Dokumentieren macht euch jedes Jahr besser.",
        ]
    )
)

flow.append(p("Sofort ab Übergabe", h1))
flow.extend(
    bullet_list(
        [
            "Beete nummerieren: HB1 bis HB9.",
            "Fotos von jedem Beet machen, am besten direkt von oben.",
            "Füllstand und Feuchte prüfen.",
            "Gute vorhandene Pflanzen nicht voreilig entfernen.",
            "2-5 cm reifen Kompost oben auf produktive Beete geben.",
            "Erst 5-6 Beete bepflanzen, nicht alle 9 unter Druck setzen.",
        ]
    )
)

flow.append(p("Beetplan für ca. 9 Hochbeete", h1))
data = [[p("<b>Beet</b>", cell), p("<b>Rolle</b>", cell), p("<b>Jetzt pflanzen/säen</b>", cell), p("<b>Wichtig</b>", cell)]]
rows = [
    ("HB1", "Tomaten-Kräuter", "Tomaten, Basilikum, Tagetes, Pflücksalat", "Rankhilfe, unten gießen"),
    ("HB2", "Gurken-Dill", "Gurken, Dill, Salat, Ringelblume", "nicht austrocknen lassen"),
    ("HB3", "Bohnen-Mangold", "Buschbohnen, Mangold, Rote Bete", "robust und ergiebig"),
    ("HB4", "Kohlrabi-Wurzel", "Kohlrabi, Möhren, Zwiebeln", "ggf. Netz gegen Schädlinge"),
    ("HB5", "Erdbeer-Kinderbeet", "Erdbeeren, Schnittlauch, Borretsch", "Minze nur im Topf"),
    ("HB6", "Zucchini kontrolliert", "max. 1 Zucchini, Kapuzinerkresse", "wuchert stark"),
    ("HB7", "Schnellbeet", "Radieschen, Rucola, Pflücksalat", "alle 2 Wochen Nachsaat"),
    ("HB8", "Nützlingsbeet", "Tagetes, Ringelblume, Kornblume, Lavendel", "Bestäuber und Schönheit"),
    ("HB9", "Reserve", "Phacelia/Buchweizen oder Herbstkultur", "Flexibilität"),
]
for row in rows:
    data.append([p(row[0], cell_bold), p(row[1], cell), p(row[2], cell), p(row[3], cell)])
t = Table(data, colWidths=[1.3 * cm, 4.2 * cm, 7.1 * cm, 4.6 * cm], repeatRows=1)
t.setStyle(table_style())
flow.append(t)
flow.append(PageBreak())

flow.append(p("Einkaufsliste Start", h1))
flow.append(p("Jungpflanzen", h2))
flow.extend(
    bullet_list(
        [
            "3-4 Tomaten",
            "2 Gurken",
            "1 Zucchini",
            "6-8 Kohlrabi",
            "12 Pflücksalat oder Saatband",
            "2-4 Mangold",
            "6-12 Erdbeeren",
            "Basilikum, Schnittlauch, Petersilie, Dill",
            "Tagetes, Ringelblume, Kapuzinerkresse, Borretsch",
        ]
    )
)
flow.append(p("Saatgut", h2))
flow.extend(
    bullet_list(
        [
            "Buschbohnen",
            "Radieschen",
            "Rucola",
            "Pflücksalat",
            "Rote Bete",
            "Möhren",
            "Phacelia oder Buchweizen",
        ]
    )
)
flow.append(p("Infrastruktur", h2))
flow.extend(
    bullet_list(
        [
            "Pflanzenetiketten und wasserfester Stift",
            "Gartenschnur",
            "Rankstäbe/Tomatenspiralen",
            "1-2 Gießkannen",
            "Schlauchadapter prüfen",
            "Kompost/Gemüseerde zum Auffüllen",
            "Gartenschere",
            "Handschuhe",
        ]
    )
)

flow.append(p("Bewässerung", h1))
flow.append(p("Start simpel:", h2))
flow.extend(
    bullet_list(
        [
            "morgens gießen;",
            "Fingerprobe 5 cm tief;",
            "Tomate/Gurke/Zucchini priorisieren;",
            "nicht abends flächig nass machen.",
        ]
    )
)
flow.append(p("Ausbau:", h2))
flow.extend(
    bullet_list(
        [
            "Tropfschlauch für HB1-HB4;",
            "Timer erst nach Anschlussprüfung;",
            "Sensor nur als Zusatz, nicht als Ersatz für Beobachtung.",
        ]
    )
)

flow.append(p("Pflegekalender", h1))
flow.append(p("Jede Woche", h2))
flow.extend(
    bullet_list(
        [
            "Gießen prüfen.",
            "Ernten.",
            "Schnecken- und Blattkontrolle.",
            "Tomaten/Gurken anbinden.",
            "Nachsaat im Schnellbeet.",
            "10-Minuten-Foto/Notiz pro Beet.",
        ]
    )
)
flow.append(p("Alle 4 Wochen", h2))
flow.extend(
    bullet_list(
        [
            "Gemeinsamer Gartentag.",
            "Kompost/Unkraut/Wege.",
            "Erntebilanz.",
            "Einkaufsliste aktualisieren.",
        ]
    )
)
flow.append(p("Herbstziel", h1))
flow.extend(
    bullet_list(
        [
            "Was hat gut getragen?",
            "Was war zu viel Arbeit?",
            "Welche Sorten wiederholen?",
            "Welche Beete rotieren in Mittelzehrer/Schwachzehrer?",
        ]
    )
)

doc = BaseDocTemplate(
    PDF,
    pagesize=A4,
    leftMargin=1.55 * cm,
    rightMargin=1.55 * cm,
    topMargin=1.5 * cm,
    bottomMargin=1.4 * cm,
)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
doc.addPageTemplates([PageTemplate(id="page", frames=[frame], onPage=on_page)])
doc.build(flow)
print(PDF)
