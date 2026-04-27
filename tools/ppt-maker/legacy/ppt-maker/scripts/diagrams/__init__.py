"""PPTX Builder Diagramming Engine — Mermaid + PlantUML

Provides branded diagram generation with SettleMint styling,
pre-built DALP templates, and high-quality PNG/SVG output
for embedding in presentations.

Usage:
    from diagrams.engine import DiagramEngine
    from diagrams.templates import DIAGRAM_TEMPLATES

    engine = DiagramEngine()
    result = engine.render_mermaid(code, 'my-diagram')
"""

from diagrams.engine import DiagramEngine, COLORS
from diagrams.templates import DIAGRAM_TEMPLATES, DIAGRAM_INDEX

__all__ = ['DiagramEngine', 'COLORS', 'DIAGRAM_TEMPLATES', 'DIAGRAM_INDEX']
