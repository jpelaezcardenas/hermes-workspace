import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(resolve(here, '../src/styles.css'), 'utf8');

const mediaStart = css.indexOf('@media (max-width: 430px)');
const mediaEnd = mediaStart === -1 ? -1 : css.indexOf('@media', mediaStart + 1);
const narrowRule = mediaStart === -1 ? '' : css.slice(mediaStart, mediaEnd === -1 ? css.length : mediaEnd);

assert.ok(narrowRule, 'Mengen legen needs a dedicated narrow viewport rule at 430px.');

const rule = narrowRule;

assert.match(rule, /\.appPlaySpace\s*\{[\s\S]*width:\s*min\(100% - 20px,\s*1180px\)/, 'Narrow play space should use smaller page gutters.');
assert.match(rule, /\.quantityGameHeader\s*\{[\s\S]*padding:\s*16px/, 'Narrow header should use compact padding.');
assert.match(rule, /\.quantityGameHeader h1\s*\{[\s\S]*font-size:\s*2rem/, 'Narrow title should stay calm and compact.');
assert.match(rule, /\.quantityLevel\s*\{[\s\S]*min-height:\s*58px/, 'Narrow level buttons should be shorter while remaining touchable.');
assert.match(rule, /\.quantityMat\s*\{[\s\S]*min-height:\s*172px/, 'Narrow mat should bring the primary action into the first viewport.');
assert.match(rule, /\.quantitySupportBar\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/, 'Narrow support buttons should avoid a long single-column stack.');
