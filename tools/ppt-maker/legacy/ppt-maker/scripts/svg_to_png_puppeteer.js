#!/usr/bin/env node
/**
 * SVG → PNG converter using Puppeteer (Chrome headless).
 * Handles foreignObject/HTML content that cairosvg/rsvg-convert cannot render.
 * 
 * Usage: node svg_to_png_puppeteer.js <svg_path> <png_path> [output_width] [slot_width] [slot_height]
 * 
 * When slot_width and slot_height are provided the SVG is centered within a canvas
 * of exactly slot_width×slot_height pixels, scaled with contain + padding.  The
 * output PNG is always exactly slot_width×slot_height regardless of the SVG's own
 * viewBox dimensions.  This prevents flat/wide diagrams (e.g. 4800×231) from
 * producing a thin sliver when placed into a portrait/square presentation slot.
 * 
 * When slot dimensions are omitted the original behaviour applies: scale the SVG
 * to output_width preserving its natural aspect ratio.
 *
 * Root cause fixed: Mermaid v10+ flowcharts embed all node labels in <foreignObject>
 * HTML elements. Static SVG renderers (cairosvg, rsvg-convert) ignore foreignObject,
 * producing blank labels. Chrome fully renders the HTML DOM including foreignObject.
 */

// ── Timeout guard ──────────────────────────────────────────────────────────────
// Maximum milliseconds to wait for a single page.screenshot() call.
// On timeout the raw SVG is written to the output path as a fallback so the
// build continues without crashing.  Adjust here to tune globally.
const RENDER_TIMEOUT_MS = 30000;

/**
 * Wrap a screenshot promise in a race against a configurable timeout.
 * On timeout: logs a warning, writes the raw SVG to pngPath, resolves 'FALLBACK_SVG'.
 * Never rejects — callers must check the return value.
 *
 * @param {() => Promise<void>} screenshotFn  Zero-arg async function that calls page.screenshot()
 * @param {string}              svgContent    Raw SVG markup to embed on timeout
 * @param {string}              pngPath       Destination file path (written with SVG on timeout)
 * @returns {Promise<'OK'|'FALLBACK_SVG'>}
 */
async function renderWithTimeout(screenshotFn, svgContent, pngPath) {
  let timeoutHandle;
  const timeoutPromise = new Promise((resolve) => {
    timeoutHandle = setTimeout(() => {
      process.stderr.write(
        `[svg_to_png] WARNING: render timed out after ${RENDER_TIMEOUT_MS}ms — ` +
        `embedding raw SVG as fallback for ${pngPath}\n`
      );
      try { require('fs').writeFileSync(pngPath, svgContent, 'utf-8'); } catch (_) {}
      resolve('FALLBACK_SVG');
    }, RENDER_TIMEOUT_MS);
  });

  try {
    await Promise.race([
      screenshotFn().then(() => 'OK'),
      timeoutPromise,
    ]);
    // Determine which branch won
    const result = require('fs').existsSync(pngPath)
      ? (require('fs').readFileSync(pngPath).slice(0, 4).toString('hex') === '89504e47' ? 'OK' : 'FALLBACK_SVG')
      : 'FALLBACK_SVG';
    return result;
  } finally {
    clearTimeout(timeoutHandle);
  }
}

// Locate puppeteer — prefer mmdc's bundled version as it always ships with this repo
const MMDC_PUPPET = '/Users/quark/.npm-global/lib/node_modules/@mermaid-js/mermaid-cli/node_modules/puppeteer';
let puppeteer;
try { puppeteer = require(MMDC_PUPPET); } catch (_) {
  try { puppeteer = require('puppeteer'); } catch (e2) {
    process.stderr.write('puppeteer not found: ' + e2.message + '\n');
    process.exit(2);
  }
}

const fs = require('fs');

async function main() {
  const svgPath = process.argv[2];
  const pngPath = process.argv[3];
  const outputWidth = parseInt(process.argv[4] || '4800');
  const slotWidth  = process.argv[5] ? parseInt(process.argv[5]) : null;
  const slotHeight = process.argv[6] ? parseInt(process.argv[6]) : null;

  if (!svgPath || !pngPath) {
    process.stderr.write('Usage: node svg_to_png_puppeteer.js <svg> <png> [width] [slot_width] [slot_height]\n');
    process.exit(1);
  }

  const svgContent = fs.readFileSync(svgPath, 'utf-8');

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    const page = await browser.newPage();

    if (slotWidth && slotHeight) {
      // ── SLOT MODE ───────────────────────────────────────────────────────────
      // Render SVG centered & contained within an exact slotWidth×slotHeight canvas.
      // Strip explicit width/height attributes from the root <svg> element so that
      // CSS max-width/max-height can freely scale it (viewBox preserves aspect ratio).
      const processedSvg = svgContent.replace(
        /<svg\b([^>]*)>/,
        (match, attrs) => {
          // Strip width/height attributes AND any inline max-width style that
          // Mermaid bakes in (e.g. style="max-width: 1027px") — these cap the
          // SVG at its native size and prevent scaling up to fill the slot.
          let cleaned = attrs.replace(/\s*(?:width|height)=["'][^"']*["']/g, '');
          cleaned = cleaned.replace(/style=["'][^"']*["']/g, '');
          return `<svg${cleaned}>`;
        }
      );

      const padding = 20; // px each side
      const maxW = slotWidth  - padding * 2;
      const maxH = slotHeight - padding * 2;

      // Parse the SVG viewBox to calculate the correct scale-up dimensions.
      // The SVG must be scaled to FILL the available space (contain mode),
      // not left at its native pixel size.
      const vbMatch = processedSvg.match(/viewBox=["']([^"'\r\n]+)["']/);
      let svgNatW = 0, svgNatH = 0;
      if (vbMatch) {
        const parts = vbMatch[1].trim().split(/[\s,]+/);
        svgNatW = parseFloat(parts[2]) || 0;
        svgNatH = parseFloat(parts[3]) || 0;
      }
      // Fallback: try width/height attributes
      if (!svgNatW || !svgNatH) {
        const wM = processedSvg.match(/<svg[^>]+\bwidth=["']([0-9.]+)/);
        const hM = processedSvg.match(/<svg[^>]+\bheight=["']([0-9.]+)/);
        svgNatW = wM ? parseFloat(wM[1]) : 800;
        svgNatH = hM ? parseFloat(hM[1]) : 400;
      }
      if (!svgNatW) svgNatW = 800;
      if (!svgNatH) svgNatH = 400;

      // Scale SVG to fill the FULL available width. For presentation diagrams,
      // horizontal space is the priority. If the resulting height exceeds the slot,
      // fall back to height-constrained scaling.
      const svgRatio = svgNatW / svgNatH;
      let fitW = maxW;
      let fitH = Math.round(maxW / svgRatio);
      if (fitH > maxH) {
        // Too tall — constrain by height instead
        fitH = maxH;
        fitW = Math.round(maxH * svgRatio);
      }

      const html =
        '<!DOCTYPE html><html><head><meta charset="utf-8">' +
        '<style>' +
        '* { margin: 0; padding: 0; box-sizing: border-box; }' +
        'body {' +
          ' background: white;' +
          ' width: '  + slotWidth  + 'px;' +
          ' height: ' + slotHeight + 'px;' +
          ' display: flex;' +
          ' align-items: center;' +
          ' justify-content: center;' +
          ' overflow: hidden;' +
        '}' +
        'svg {' +
          ' display: block;' +
          ' width: '  + fitW + 'px !important;' +
          ' height: ' + fitH + 'px !important;' +
        '}' +
        /* Prevent text clipping inside mermaid nodes */
        '.nodeLabel, .label { overflow: visible !important; }' +
        'foreignObject { overflow: visible !important; }' +
        '.node foreignObject div { padding: 4px 8px !important; }' +
        '</style></head><body>' + processedSvg + '</body></html>';

      await page.setViewport({ width: slotWidth, height: slotHeight, deviceScaleFactor: 1 });
      await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await new Promise(r => setTimeout(r, 1000));
      const slotResult = await renderWithTimeout(
        () => page.screenshot({
          path: pngPath,
          type: 'png',
          clip: { x: 0, y: 0, width: slotWidth, height: slotHeight }
        }),
        svgContent,
        pngPath
      );
      if (slotResult === 'FALLBACK_SVG') {
        process.stdout.write('FALLBACK_SVG ' + slotWidth + 'x' + slotHeight + '\n');
      } else {
        process.stdout.write('OK ' + slotWidth + 'x' + slotHeight + '\n');
      }

    } else {
      // ── NATURAL MODE (original behaviour) ───────────────────────────────────
      // Scale SVG to outputWidth, derive height from natural aspect ratio.
      const vbMatch = svgContent.match(/viewBox=["']([^"'\r\n]+)["']/);
      let naturalWidth = 0, naturalHeight = 0;
      if (vbMatch) {
        const parts = vbMatch[1].trim().split(/[\s,]+/);
        naturalWidth  = parseFloat(parts[2]) || 0;
        naturalHeight = parseFloat(parts[3]) || 0;
      }
      if (!naturalWidth || !naturalHeight) {
        const wMatch = svgContent.match(/<svg[^>]+\bwidth=["']([0-9.]+)/);
        const hMatch = svgContent.match(/<svg[^>]+\bheight=["']([0-9.]+)/);
        naturalWidth  = wMatch ? parseFloat(wMatch[1]) : 0;
        naturalHeight = hMatch ? parseFloat(hMatch[1]) : 0;
      }
      if (!naturalWidth || !naturalHeight) {
        naturalWidth  = 800;
        naturalHeight = 400;
      }

      const scale        = outputWidth / naturalWidth;
      const outputHeight = Math.ceil(naturalHeight * scale);

      await page.setViewport({ width: outputWidth, height: outputHeight, deviceScaleFactor: 1 });

      const html =
        '<!DOCTYPE html><html><head><meta charset="utf-8">' +
        '<style>' +
        '* { margin: 0; padding: 0; box-sizing: border-box; }' +
        'body { background: white; width: ' + outputWidth + 'px; height: ' + outputHeight + 'px; overflow: hidden; }' +
        'svg { display: block; width: 100% !important; height: auto !important; }' +
        /* Prevent text clipping inside mermaid nodes */
        '.nodeLabel, .label { overflow: visible !important; }' +
        'foreignObject { overflow: visible !important; }' +
        '.node foreignObject div { padding: 4px 8px !important; }' +
        '</style></head><body>' + svgContent + '</body></html>';

      await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await new Promise(r => setTimeout(r, 1000));
      const naturalResult = await renderWithTimeout(
        () => page.screenshot({
          path: pngPath,
          type: 'png',
          clip: { x: 0, y: 0, width: outputWidth, height: outputHeight }
        }),
        svgContent,
        pngPath
      );
      if (naturalResult === 'FALLBACK_SVG') {
        process.stdout.write('FALLBACK_SVG ' + outputWidth + 'x' + outputHeight + '\n');
      } else {
        process.stdout.write('OK ' + outputWidth + 'x' + outputHeight + '\n');
      }
    }

  } finally {
    await browser.close();
  }
}

main().catch(e => { process.stderr.write('ERROR: ' + e.message + '\n'); process.exit(1); });
