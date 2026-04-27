---
title: "PPTX Builder — Diagram Templates Reference"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.698985Z
---

# PPTX Builder — Diagram Templates Reference

## Overview

The diagramming engine renders Mermaid and PlantUML diagrams with SettleMint brand styling for embedding in presentations. All output uses the brand color palette, Figtree font, and rounded corners.

## Rendering Pipeline

Production decks use **parallel pre-rendering** via `build_from_config.py`. All `.mmd` / `.mermaid` sources are rendered concurrently (up to 4 workers) before slide assembly begins, with results cached for instant lookup during assembly. See the main `README.md` for details.

**Appendix rule:** All appendix diagram slides must include a text explanation (`body` field). Diagram-only appendix slides are rejected by the builder.

## Quick Start

```python
from diagrams.engine import DiagramEngine

engine = DiagramEngine()

# Render custom Mermaid code for this presentation
# PPT Maker production decks require fresh, presentation-specific diagrams.
# Reusable template rendering is disabled.

# Render custom Mermaid code
result = engine.render_mermaid('graph LR\n  A-->B', 'custom-diagram')

# Note: render_template() and render_all_templates() are intentionally disabled for PPT Maker production use.
```

## Reference Diagram Patterns

These examples are style references only. For PPT Maker production decks, Mermaid diagrams must be generated new for the specific presentation context and must not be reused as generic diagrams.


### Architecture (`architecture`)
| Template | Description |
|----------|-------------|
| `platform_architecture` | DALP 3-tier platform layers: Experience → Business Services → Infrastructure |
| `network_topology` | Blockchain network topology with validators, staging, external integrations |

**Use for:** Platform overview slides, technical deep dives, architecture stack layouts

### Flow (`flow`)
| Template | Description |
|----------|-------------|
| `asset_lifecycle` | Digital asset lifecycle: Configure → Deploy → Issue → Service → Redeem |
| `token_issuance_flow` | Token issuance with compliance gates and KYC/AML verification |

**Use for:** Process slides, implementation flows, decision trees

### Sequence (`sequence`)
| Template | Description |
|----------|-------------|
| `compliance_sequence` | Transfer compliance check: Investor → Platform → Compliance → Blockchain |

**Use for:** API integration slides, compliance workflows, user journey maps

### Gantt (`gantt`)
| Template | Description |
|----------|-------------|
| `deployment_timeline` | DALP implementation timeline: Discovery → Development → Testing → Launch |

**Use for:** Implementation roadmap slides, project timelines, phase planning

### Entity-Relationship (`er`)
| Template | Description |
|----------|-------------|
| `entity_relationship` | DALP data model: Asset, Token, Holder, Transaction, Compliance Rule |

**Use for:** Data model slides, database architecture, system design

### State (`state`)
| Template | Description |
|----------|-------------|
| `state_diagram` | Asset state transitions: Draft → Configured → Deployed → Active → Matured → Redeemed |

**Use for:** Asset lifecycle states, workflow state machines

### Class (`class`)
| Template | Description |
|----------|-------------|
| `class_diagram` | Smart contract hierarchy: DALPAsset, ComplianceModule, IdentityRegistry |

**Use for:** Smart contract architecture, module relationships

### Pie (`pie`)
| Template | Description |
|----------|-------------|
| `pie_chart` | Asset distribution by type (Fixed Income, Equity, Real Estate, Funds, Commodities) |

**Use for:** Market share, portfolio breakdown, distribution analysis

## SettleMint Brand Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Primary | `#0000FF` | Borders, accents, active elements |
| Primary Light | `#E8E8FF` | Node backgrounds, fills |
| Text Dark | `#111111` | Primary text |
| Text Gray | `#787878` | Lines, arrows, secondary text |
| Green | `#187848` | Success, deployment, completion |
| Green Light | `#E8F5E8` | Secondary backgrounds |
| Purple | `#8848C8` | Tertiary highlights |
| Purple Light | `#F0E8F8` | Tertiary backgrounds |
| Orange | `#C05030` | Warnings, critical paths |
| Orange Light | `#FFF0E8` | Warning backgrounds |
| Steel | `#1E4868` | Infrastructure, external |
| Steel Light | `#E8F0F8` | Infrastructure backgrounds |
| Yellow | `#BCA820` | Notes, decisions |
| Yellow Light | `#F8F5E0` | Note backgrounds |

## Adding Reference Patterns

Only add examples here when they are meant as styling references, not production-ready reusable deck diagrams. PPT Maker production decks must use fresh Mermaid/PlantUML code written for the specific presentation context.

1. Add your reference pattern to `templates.py` → `DIAGRAM_TEMPLATES` dict
2. Include: `type` (mermaid/plantuml), `category`, `description`, `code`
3. Register in `DIAGRAM_INDEX` under the appropriate category
4. Update `INDEX.json` for machine-readable access

### Custom Mermaid Example
```python
# In templates.py
"my_custom_flow": {
    "type": "mermaid",
    "category": "flow",
    "description": "My custom process flow",
    "code": """graph LR
    A[Step 1] --> B[Step 2] --> C[Step 3]
    style A fill:#E8E8FF,stroke:#0000FF,rx:15,ry:15
    style B fill:#E8F5E8,stroke:#187848,rx:15,ry:15
    style C fill:#F0E8F8,stroke:#8848C8,rx:15,ry:15"""
}
```

## Engine Configuration

- **Default output:** `ppt-maker/output/diagrams/`
- **Default width:** 2400px (hi-res for presentation embedding)
- **Background:** white/transparent-safe render path depending on engine
- **Mermaid PNG path:** direct `mmdc` PNG render at scale 3 (~216 DPI effective), with SVG→PNG fallback if needed
- **PlantUML/UML PNG path:** PlantUML PNG render at 300 DPI
- **PPT embedding policy:** SVG is retained as the canonical source artifact, but current PPT generation embeds PNG because native SVG import is not reliable in this `python-pptx` pipeline
- **Mermaid config:** `mermaid-config.json` (brand-themed)

## Dependencies

- **Required:** `mmdc` (Mermaid CLI) — `npm install -g @mermaid-js/mermaid-cli` or via `npx`
- **Optional:** `plantuml` CLI or Java + plantuml.jar
- **Optional:** `cairosvg` (Python) or `rsvg-convert` (CLI) for PNG conversion
- **Optional:** `Pillow` for image size detection
