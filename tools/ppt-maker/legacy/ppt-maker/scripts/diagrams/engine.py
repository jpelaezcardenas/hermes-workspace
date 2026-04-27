#!/usr/bin/env python3
"""
Diagram generation engine for PPT Maker.

Supports Mermaid and PlantUML/UML diagram types with SettleMint brand styling.
Outputs SVG as the canonical source artifact and a high-quality PNG fallback for
PowerPoint embedding.

This mirrors the proven bid-manager stack:
- Mermaid via mmdc + bundled Puppeteer config
- PlantUML via local jar or CLI + Graphviz dot
- Syntax validation helpers for both engines
"""
from __future__ import annotations

import glob
import json
import os
import shutil
import signal
import subprocess
import tempfile
import time
from pathlib import Path
from typing import Optional

SCRIPT_DIR = Path(__file__).parent
DEFAULT_OUTPUT_DIR = Path(__file__).parent.parent.parent / 'output' / 'diagrams'

# Embedded Figtree CSS for Mermaid diagrams.  Mermaid's mmdc uses Puppeteer
# (headless Chrome) which has no access to local/Google Fonts by default.
# Without this CSS the font-family declaration in the Mermaid config is silently
# ignored and Chrome falls back to a generic sans-serif, producing visually
# inconsistent diagrams.  The bid-manager solved this identically.
# Use a Mermaid-specific CSS that contains ONLY @font-face declarations.
# The shared figtree-embedded.css has a wildcard `* { font-family: ... !important; }`
# that overrides Mermaid's internal SVG styles and causes strikethrough text artifacts.
FIGTREE_CSS = Path(__file__).resolve().parent / 'figtree-mermaid.css'
MMDC_PATH = os.environ.get('MMDC_PATH', 'mmdc')
PLANTUML_JAR = os.environ.get('PLANTUML_JAR', '/Users/quark/tools/plantuml.jar')
GRAPHVIZ_DOT = os.environ.get('GRAPHVIZ_DOT', '/opt/homebrew/bin/dot')
DEFAULT_MERMAID_DPI = 300
DEFAULT_MERMAID_SCALE = 3  # Keep at 3 (scale=4 crashes on macOS); 300 DPI achieved via Puppeteer output width
DEFAULT_PLANTUML_DPI = 300

COLORS = {
    'primary': '#0000FF',
    'primary_light': '#E8E8FF',
    'text_dark': '#111111',
    'text_gray': '#787878',
    'bg_light': '#F7F7F7',
    'bg_card': '#FAFAFA',
    'green': '#187848',
    'green_light': '#E8F5E8',
    'purple': '#8848C8',
    'purple_light': '#F0E8F8',
    'orange': '#C05030',
    'orange_light': '#FFF0E8',
    'steel': '#1E4868',
    'steel_light': '#E8F0F8',
    'yellow': '#BCA820',
    'yellow_light': '#F8F5E0',
    'divider': '#E0E0E0',
    'white': '#FFFFFF',
}

BRAND_SKINPARAM_BLOCK = """skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam HyperlinkColor #0000FF
skinparam Shadowing false
skinparam RoundCorner 15
skinparam Padding 10
skinparam ArrowColor #000099
skinparam ArrowThickness 1.5
skinparam LineColor #000099
skinparam NoteBackgroundColor #F5F0B0
skinparam NoteBorderColor #BCA820
skinparam NoteFontColor #102848
skinparam PackageBorderColor #000099
skinparam PackageFontColor #000099
skinparam PackageBackgroundColor #D8E8F0
skinparam RectangleBackgroundColor #D8E8F0
skinparam RectangleBorderColor #000099
skinparam RectangleFontColor #000099
skinparam CardBackgroundColor #C0E0F0
skinparam CardBorderColor #284878
skinparam CardFontColor #284878
skinparam NodeBackgroundColor #C0F0C0
skinparam NodeBorderColor #187848
skinparam NodeFontColor #187848
skinparam ComponentBackgroundColor #C8A8E8
skinparam ComponentBorderColor #482068
skinparam ComponentFontColor #482068
skinparam InterfaceBackgroundColor #F2B8A0
skinparam InterfaceBorderColor #C05030
skinparam InterfaceFontColor #C05030
skinparam ArtifactBackgroundColor #B8D8E0
skinparam ArtifactBorderColor #1E4868
skinparam ArtifactFontColor #1E4868
skinparam CloudBackgroundColor #C0E0F0
skinparam CloudBorderColor #284878
skinparam CloudFontColor #284878
skinparam DatabaseBackgroundColor #B0C0D8
skinparam DatabaseBorderColor #183060
skinparam DatabaseFontColor #183060
skinparam QueueBackgroundColor #F5F0B0
skinparam QueueBorderColor #BCA820
skinparam QueueFontColor #102848
skinparam UsecaseBackgroundColor #F2B8A0
skinparam UsecaseBorderColor #C05030
skinparam UsecaseFontColor #C05030
skinparam ClassBackgroundColor #D8E8F0
skinparam ClassBorderColor #000099
skinparam ClassFontColor #000099
skinparam ClassAttributeFontColor #000000
skinparam ClassStereotypeFontColor #506878
skinparam ObjectBackgroundColor #C0F0C0
skinparam ObjectBorderColor #187848
skinparam ObjectFontColor #187848
skinparam ActivityBackgroundColor #D8E8F0
skinparam ActivityBorderColor #000099
skinparam ActivityFontColor #000099
skinparam ActivityDiamondBackgroundColor #F5F0B0
skinparam ActivityDiamondBorderColor #BCA820
skinparam ActivityDiamondFontColor #102848
skinparam SequenceLifeLineBorderColor #506878
skinparam SequenceLifeLineBackgroundColor #F2F2F2
skinparam SequenceParticipantBackgroundColor #D8E8F0
skinparam SequenceParticipantBorderColor #000099
skinparam SequenceParticipantFontColor #000099
skinparam SequenceActorBackgroundColor #F2B8A0
skinparam SequenceActorBorderColor #C05030
skinparam SequenceActorFontColor #C05030
skinparam SequenceArrowColor #000099
skinparam SequenceGroupBorderColor #284878
skinparam SequenceGroupBackgroundColor #C0E0F0
skinparam SequenceGroupHeaderFontColor #284878
skinparam SequenceBoxBorderColor #506878
skinparam SequenceBoxBackgroundColor #F2F2F2
skinparam PartitionBackgroundColor #C0E0F0
skinparam PartitionBorderColor #284878
skinparam PartitionFontColor #284878
skinparam LegendBackgroundColor #F2F2F2
skinparam LegendBorderColor #8898A8
skinparam LegendFontColor #000000
skinparam TitleFontName Figtree
skinparam TitleFontColor #000099
skinparam TitleFontSize 18
skinparam TitleBorderThickness 0
skinparam CaptionFontName Figtree
skinparam CaptionFontColor #506878"""


def _find_plantuml_jar() -> Optional[str]:
    candidates = [
        PLANTUML_JAR,
        '/opt/homebrew/Cellar/plantuml/*/libexec/plantuml.jar',
        '/usr/local/Cellar/plantuml/*/libexec/plantuml.jar',
        '/usr/share/plantuml/plantuml.jar',
        '/usr/local/share/plantuml/plantuml.jar',
    ]
    for candidate in candidates:
        if '*' in candidate:
            matches = glob.glob(candidate)
            if matches:
                return matches[0]
        elif Path(candidate).exists():
            return candidate
    return None


class DiagramEngine:
    """Renders Mermaid and PlantUML/UML diagrams with SettleMint brand styling."""

    def __init__(self, output_dir: Optional[Path] = None):
        self.output_dir = Path(output_dir) if output_dir else DEFAULT_OUTPUT_DIR
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self._config_path: Optional[str] = None

    def _get_mermaid_config(self, theme: str = 'base') -> str:
        if self._config_path and Path(self._config_path).exists():
            return self._config_path

        bundled = SCRIPT_DIR / 'mermaid-config.json'
        if bundled.exists():
            self._config_path = str(bundled)
            return self._config_path

        config = {
            'theme': theme,
            'themeVariables': {
                'primaryColor': '#E8EAF6',
                'primaryTextColor': '#000099',
                'primaryBorderColor': '#000099',
                'lineColor': '#000099',
                'secondaryColor': '#FFF3E0',
                'tertiaryColor': '#E8F5E9',
                'background': '#FFFFFF',
                'fontFamily': 'Figtree, sans-serif',
            },
            'flowchart': {
                'htmlLabels': False,
                'padding': 50,
                'nodeSpacing': 70,
                'rankSpacing': 70,
                'useMaxWidth': False,
                'wrappingWidth': 300,
            },
            'sequence': {
                'useMaxWidth': False,
            },
        }
        with tempfile.NamedTemporaryFile(suffix='.json', mode='w', delete=False) as f:
            json.dump(config, f)
            self._config_path = f.name
        return self._config_path

    def _find_mmdc(self) -> list[str]:
        configured = os.environ.get('MMDC_PATH')
        if configured:
            local = shutil.which(configured) if configured == 'mmdc' else configured
            if local and (Path(local).exists() or shutil.which(str(local))):
                return [str(local)]
        local = shutil.which(MMDC_PATH)
        if local:
            return [local]
        return ['npx', '--yes', '@mermaid-js/mermaid-cli']

    def _get_puppeteer_config(self) -> Optional[str]:
        bundled = SCRIPT_DIR / 'puppeteer-config.json'
        return str(bundled) if bundled.exists() else None

    def _plantuml_env(self) -> dict:
        env = os.environ.copy()
        if Path(GRAPHVIZ_DOT).exists():
            env.setdefault('GRAPHVIZ_DOT', GRAPHVIZ_DOT)
        return env

    def render_source_file(
        self,
        source_path: Path | str,
        filename: Optional[str] = None,
        output_format: str = 'both',
        width: Optional[int] = None,
        slot_width: Optional[int] = None,
        slot_height: Optional[int] = None,
    ) -> dict:
        path = Path(source_path)
        suffix = path.suffix.lower()
        code = path.read_text(encoding='utf-8')
        filename = filename or path.stem
        if suffix in {'.mmd', '.mermaid'}:
            render_width = width or 2400
            return self.render_mermaid(code, filename, width=render_width,
                                       output_format=output_format,
                                       slot_width=slot_width, slot_height=slot_height)
        if suffix in {'.puml', '.plantuml', '.uml'}:
            return self.render_plantuml(code, filename, output_format=output_format)
        return {'error': f'Unsupported diagram source extension: {suffix}', 'svg': None, 'png': None}

    def validate_source_file(self, source_path: Path | str) -> tuple[bool, str]:
        path = Path(source_path)
        suffix = path.suffix.lower()
        code = path.read_text(encoding='utf-8')
        if suffix in {'.mmd', '.mermaid'}:
            return self.validate_mermaid_syntax(code)
        if suffix in {'.puml', '.plantuml', '.uml'}:
            return self.validate_plantuml_syntax(code)
        return False, f'Unsupported diagram source extension: {suffix}'

    def validate_mermaid_syntax(self, code: str) -> tuple[bool, str]:
        with tempfile.NamedTemporaryFile(mode='w', suffix='.mmd', delete=False, encoding='utf-8') as f:
            f.write(code)
            f.flush()
            mmd_path = f.name
        check_out = tempfile.mktemp(suffix='.svg')
        cmd = self._find_mmdc() + ['-i', mmd_path, '-o', check_out, '--outputFormat', 'svg']
        if FIGTREE_CSS.exists():
            cmd.extend(['--cssFile', str(FIGTREE_CSS)])
        puppeteer_config = self._get_puppeteer_config()
        if puppeteer_config:
            cmd.extend(['--puppeteerConfigFile', puppeteer_config])
        try:
            result = self._run_mermaid_command(cmd, Path(check_out), timeout=30)
            if result['ok']:
                return True, ''
            return False, result['message']
        except FileNotFoundError:
            return False, 'mmdc not found. Install: npm install -g @mermaid-js/mermaid-cli'
        finally:
            Path(mmd_path).unlink(missing_ok=True)
            Path(check_out).unlink(missing_ok=True)

    def render_mermaid(
        self,
        code: str,
        filename: str,
        width: int = 2400,
        bg_color: str = 'white',
        theme: str = 'base',
        output_format: str = 'both',
        scale: int = DEFAULT_MERMAID_SCALE,
        slot_width: Optional[int] = None,
        slot_height: Optional[int] = None,
    ) -> dict:
        svg_path = self.output_dir / f'{filename}.svg'
        png_path = self.output_dir / f'{filename}.png'

        with tempfile.NamedTemporaryFile(suffix='.mmd', mode='w', delete=False, encoding='utf-8') as f:
            f.write(code)
            mmd_path = f.name

        config_path = self._get_mermaid_config(theme)
        mmdc_cmd = self._find_mmdc()
        puppeteer_config = self._get_puppeteer_config()

        try:
            response = {'svg': None, 'png': None, 'error': None}

            if output_format in ('svg', 'both'):
                svg_cmd = mmdc_cmd + [
                    '-i', mmd_path,
                    '-o', str(svg_path),
                    '--outputFormat', 'svg',
                    '--configFile', config_path,
                    '--backgroundColor', bg_color,
                    '-w', str(width),
                ]
                if FIGTREE_CSS.exists():
                    svg_cmd.extend(['--cssFile', str(FIGTREE_CSS)])
                if puppeteer_config:
                    svg_cmd.extend(['--puppeteerConfigFile', puppeteer_config])
                result = self._run_mermaid_command(svg_cmd, svg_path, timeout=45)
                if not result['ok'] or not svg_path.exists():
                    return {'error': result['message'], 'svg': None, 'png': None}
                response['svg'] = str(svg_path)
                time.sleep(0.5)

            if output_format in ('png', 'both'):
                # Render PNG directly via mmdc (same approach as bid-manager).
                # mmdc handles Puppeteer internally and produces correctly-sized output.
                # Previous SVG→Puppeteer→PNG pipeline caused sizing issues because
                # Mermaid's inline max-width styles prevented scale-up.
                # Using --scale 3 gives ~216 DPI (3x base 72 DPI).
                png_cmd = mmdc_cmd + [
                    '-i', mmd_path,
                    '-o', str(png_path),
                    '--outputFormat', 'png',
                    '--scale', str(scale),
                    '--configFile', config_path,
                    '--backgroundColor', bg_color,
                ]
                # Use the SHARED figtree-embedded.css (with wildcard * selector)
                # for direct PNG rendering. This works correctly with mmdc's internal
                # Puppeteer because mmdc applies CSS before rendering, unlike the
                # SVG→PNG path where the wildcard interfered with Mermaid's SVG styles.
                shared_figtree_css = FIGTREE_CSS.parent.parent.parent.parent / 'shared' / 'brand' / 'figtree-embedded.css'
                if shared_figtree_css.exists():
                    png_cmd.extend(['--cssFile', str(shared_figtree_css)])
                elif FIGTREE_CSS.exists():
                    png_cmd.extend(['--cssFile', str(FIGTREE_CSS)])
                if puppeteer_config:
                    png_cmd.extend(['--puppeteerConfigFile', puppeteer_config])
                # Retry up to 3 times with delay (Chrome can be flaky on macOS)
                png_ok = False
                for attempt in range(3):
                    png_result = self._run_mermaid_command(png_cmd, png_path, timeout=60)
                    if png_result['ok'] and png_path.exists():
                        response['png'] = str(png_path)
                        png_ok = True
                        break
                    if attempt < 2:
                        time.sleep(5 * (attempt + 1))
                if not png_ok:
                    return {'error': f'Direct PNG render failed after 3 attempts: {png_result.get("message", "unknown")}', 'svg': response.get('svg'), 'png': None}

                # Post-process: composite the diagram onto a canvas matching the
                # target slot dimensions. This ensures the PNG has the exact same
                # aspect ratio as the slide placeholder, so PowerPoint places it
                # at full placeholder size with no contain/cover scaling issues.
                if slot_width and slot_height and png_path.exists():
                    self._fit_png_to_slot(png_path, slot_width, slot_height)
                    response['png'] = str(png_path)

            return response
        except FileNotFoundError:
            return {'error': 'mmdc not found. Install: npm install -g @mermaid-js/mermaid-cli', 'svg': None, 'png': None}
        except Exception as e:
            return {'error': str(e), 'svg': None, 'png': None}
        finally:
            Path(mmd_path).unlink(missing_ok=True)

    @staticmethod
    def _fit_png_to_slot(png_path: Path, slot_width: int, slot_height: int):
        """Composite diagram PNG onto a white canvas matching the slot dimensions.

        The diagram is scaled (contain) and centered on the canvas. This ensures
        the output PNG has the exact aspect ratio of the slide placeholder, so
        PowerPoint places it at full size with no additional scaling or whitespace.
        """
        from PIL import Image as PILImage
        try:
            with PILImage.open(png_path) as src:
                src_w, src_h = src.size
                # If already the right ratio (within 1%), skip
                src_ratio = src_w / src_h if src_h else 1
                tgt_ratio = slot_width / slot_height if slot_height else 1
                if abs(src_ratio - tgt_ratio) / tgt_ratio < 0.01:
                    return
                # Scale diagram to fit within slot (contain)
                scale = min(slot_width / src_w, slot_height / src_h)
                new_w = max(1, int(src_w * scale))
                new_h = max(1, int(src_h * scale))
                resized = src.resize((new_w, new_h), PILImage.Resampling.LANCZOS)
                # Create white canvas at slot dimensions, paste centered
                canvas = PILImage.new('RGB', (slot_width, slot_height), (255, 255, 255))
                paste_x = (slot_width - new_w) // 2
                paste_y = (slot_height - new_h) // 2
                canvas.paste(resized, (paste_x, paste_y))
                canvas.save(png_path, format='PNG')
        except Exception:
            pass  # If compositing fails, keep the original PNG

    def _has_brand_skinparams(self, code: str) -> bool:
        checks = [
            'skinparam DefaultFontName Figtree',
            'skinparam RoundCorner 15',
            'skinparam DefaultFontColor #000099',
        ]
        normalized = code.lower()
        return any(check.lower() in normalized for check in checks)

    def _ensure_wrapped_plantuml(self, code: str) -> str:
        stripped = code.strip()
        if stripped.lower().startswith('@startuml') and stripped.lower().endswith('@enduml'):
            return stripped
        return f'@startuml\n{stripped}\n@enduml'

    def _apply_plantuml_skin(self, code: str) -> str:
        wrapped = self._ensure_wrapped_plantuml(code)
        if self._has_brand_skinparams(wrapped):
            return wrapped
        return wrapped.replace('@startuml', f'@startuml\n{BRAND_SKINPARAM_BLOCK}', 1)

    def validate_plantuml_syntax(self, code: str) -> tuple[bool, str]:
        wrapped = self._apply_plantuml_skin(code)
        with tempfile.NamedTemporaryFile(mode='w', suffix='.puml', delete=False, encoding='utf-8') as f:
            f.write(wrapped)
            f.flush()
            puml_path = Path(f.name)
        try:
            if shutil.which('plantuml'):
                result = subprocess.run(
                    ['plantuml', '-checkonly', str(puml_path)],
                    capture_output=True,
                    text=True,
                    timeout=30,
                    env=self._plantuml_env(),
                )
            else:
                jar_path = _find_plantuml_jar()
                if not jar_path or not shutil.which('java'):
                    return False, 'PlantUML not available. Install via brew install plantuml or provide PLANTUML_JAR'
                result = subprocess.run(
                    ['java', '-jar', jar_path, '-checkonly', str(puml_path)],
                    capture_output=True,
                    text=True,
                    timeout=30,
                    env=self._plantuml_env(),
                )
            if result.returncode == 0:
                return True, ''
            return False, result.stderr.strip() or result.stdout.strip() or 'Unknown PlantUML validation error'
        except subprocess.TimeoutExpired:
            return False, 'PlantUML validation timed out (30s)'
        finally:
            puml_path.unlink(missing_ok=True)

    def render_plantuml(self, code: str, filename: str, output_format: str = 'both') -> dict:
        svg_path = self.output_dir / f'{filename}.svg'
        png_path = self.output_dir / f'{filename}.png'
        skinned_code = self._apply_plantuml_skin(code)
        puml_path = self.output_dir / f'{filename}.puml'
        puml_path.write_text(skinned_code, encoding='utf-8')

        try:
            if shutil.which('plantuml'):
                return self._render_plantuml_cli(str(puml_path), svg_path, png_path, output_format)
            jar_path = _find_plantuml_jar()
            if jar_path and shutil.which('java'):
                return self._render_plantuml_jar(str(puml_path), jar_path, svg_path, png_path, output_format)
            return {
                'error': 'PlantUML not available. Install via brew install plantuml or provide PLANTUML_JAR',
                'svg': None,
                'png': None,
            }
        except Exception as e:
            return {'error': str(e), 'svg': None, 'png': None}
        finally:
            puml_path.unlink(missing_ok=True)

    def render_auto(self, code: str, language: str, filename: str, **kwargs) -> dict:
        lang = language.lower()
        if lang == 'mermaid':
            return self.render_mermaid(code, filename, **kwargs)
        if lang in ('plantuml', 'uml', 'puml'):
            return self.render_plantuml(code, filename, **kwargs)
        return {'error': f'Unsupported diagram language: {language}', 'svg': None, 'png': None}

    def render_template(self, template_name: str, **kwargs) -> dict:
        return {
            'error': (
                'PPT Maker production decks must use presentation-specific Mermaid or PlantUML code. '
                f'Reusable template rendering is disabled; do not use diagram template "{template_name}".'
            ),
            'svg': None,
            'png': None,
        }

    def render_all_templates(self) -> dict:
        return {
            '_error': {
                'error': (
                    'PPT Maker production decks must use presentation-specific Mermaid or PlantUML code. '
                    'Bulk rendering of reusable diagram templates is disabled.'
                ),
                'svg': None,
                'png': None,
            }
        }

    def _run_mermaid_command(self, cmd: list[str], expected_output: Path, timeout: int) -> dict:
        process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            start_new_session=True,
        )
        try:
            stdout, stderr = process.communicate(timeout=timeout)
            if process.returncode == 0 and expected_output.exists():
                return {'ok': True, 'message': ''}
            message = (stderr or stdout or '').strip() or 'Unknown Mermaid render error'
            if expected_output.exists():
                return {'ok': True, 'message': f'Command reported an issue but output exists: {message}'}
            return {'ok': False, 'message': message}
        except subprocess.TimeoutExpired:
            try:
                os.killpg(process.pid, signal.SIGTERM)
            except ProcessLookupError:
                pass
            try:
                stdout, stderr = process.communicate(timeout=5)
            except subprocess.TimeoutExpired:
                try:
                    os.killpg(process.pid, signal.SIGKILL)
                except ProcessLookupError:
                    pass
                stdout, stderr = process.communicate()
            if expected_output.exists():
                return {'ok': True, 'message': f'Mermaid command timed out after {timeout}s but output file was created'}
            message = (stderr or stdout or '').strip() or f'Mermaid render timed out ({timeout}s)'
            return {'ok': False, 'message': message}

    def _svg_to_png(self, svg_path: Path, png_path: Path, width: int = 2400,
                    slot_width: Optional[int] = None, slot_height: Optional[int] = None) -> Optional[str]:
        # Puppeteer (Chrome headless) is the only supported SVG→PNG converter.
        # Mermaid v10+ flowcharts embed ALL node labels in <foreignObject> HTML divs.
        # cairosvg and rsvg-convert both ignore foreignObject → boxes render, labels disappear.
        # Puppeteer renders the full DOM including foreignObject, matching the SVG appearance exactly.
        # Root cause confirmed 2026-03-20: every Mermaid flowchart node uses foreignObject for text.
        output_px = max(width * 3, 4800)  # 3x multiplier for ~300 DPI output
        return self._svg_to_png_puppeteer(svg_path, png_path, output_px,
                                          slot_width=slot_width, slot_height=slot_height)

    def _svg_to_png_puppeteer(self, svg_path: Path, png_path: Path, width: int = 4800,
                               slot_width: Optional[int] = None, slot_height: Optional[int] = None) -> Optional[str]:
        """Convert SVG → PNG via Puppeteer Node.js script.

        This is the only converter that correctly handles <foreignObject> HTML content
        produced by Mermaid v10+ flowchart diagrams. Without this, all node labels
        are invisible because cairosvg/rsvg-convert silently drop foreignObject.

        When slot_width and slot_height are provided the output PNG is sized exactly
        to those dimensions, with the SVG scaled (contain) and centered.  This prevents
        wide/flat diagrams from producing a thin sliver when placed into taller slots.
        """
        script = SCRIPT_DIR / '..' / 'svg_to_png_puppeteer.js'
        script = script.resolve()
        if not script.exists():
            return None
        node_bin = shutil.which('node') or shutil.which('nodejs')
        if not node_bin:
            return None
        try:
            cmd = [node_bin, str(script), str(svg_path), str(png_path), str(width)]
            if slot_width and slot_height:
                cmd.extend([str(slot_width), str(slot_height)])
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=60,
            )
            if result.returncode == 0 and png_path.exists():
                return str(png_path)
        except (subprocess.CalledProcessError, subprocess.TimeoutExpired, OSError):
            pass
        return None

    def _render_plantuml_cli(self, puml_path: str, svg_path: Path, png_path: Path, output_format: str) -> dict:
        result = {'svg': None, 'png': None, 'error': None}
        env = self._plantuml_env()

        if output_format in ('svg', 'both'):
            subprocess.run(
                ['plantuml', '-tsvg', puml_path],
                capture_output=True, text=True, timeout=60, check=True, env=env,
            )
            if svg_path.exists():
                result['svg'] = str(svg_path)

        if output_format in ('png', 'both'):
            subprocess.run(
                ['plantuml', '-tpng', f'-Sdpi={DEFAULT_PLANTUML_DPI}', puml_path],
                capture_output=True, text=True, timeout=60, check=True, env=env,
            )
            if png_path.exists():
                result['png'] = str(png_path)
        return result

    def _render_plantuml_jar(self, puml_path: str, jar_path: str, svg_path: Path, png_path: Path, output_format: str) -> dict:
        result = {'svg': None, 'png': None, 'error': None}
        env = self._plantuml_env()

        if output_format in ('svg', 'both'):
            subprocess.run(
                ['java', '-jar', jar_path, '-tsvg', puml_path],
                capture_output=True, text=True, timeout=60, check=True, env=env,
            )
            if svg_path.exists():
                result['svg'] = str(svg_path)

        if output_format in ('png', 'both'):
            subprocess.run(
                ['java', '-jar', jar_path, f'-Sdpi={DEFAULT_PLANTUML_DPI}', '-tpng', puml_path],
                capture_output=True, text=True, timeout=60, check=True, env=env,
            )
            if png_path.exists():
                result['png'] = str(png_path)
        return result
